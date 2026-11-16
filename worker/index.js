import { products } from '../src/config.js';
import { calculateOrder, VOLUME_DISCOUNT_RATE, VOLUME_DISCOUNT_MIN_LITRES } from '../src/pricing.js';

const headers = {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const reply=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
const authHeader=(env)=>`Basic ${btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`)}`;
const configured=(env)=>env.PAYMENTS_ENABLED==='true'&&Boolean(env.RAZORPAY_KEY_ID&&env.RAZORPAY_KEY_SECRET);
const sameOrigin=(request)=>{const origin=request.headers.get('Origin');return !origin || origin===new URL(request.url).origin;};
const validId=(id)=>typeof id==='string'&&/^[A-Za-z0-9_\-]{5,80}$/.test(id);
async function razorpay(path,env,options={}) {
 const response=await fetch('https://api.razorpay.com/v1'+path,{...options,headers:{Authorization:authHeader(env),...(options.body?{'Content-Type':'application/json'}:{})}});
 const data=await response.json().catch(()=>({}));
 if(!response.ok)throw new Error('Payment provider rejected the request. Check your account and credentials.');
 return data;
}
async function createOrder(request,env) {
 if(!configured(env))return reply({error:'Online payments are not enabled. Please use WhatsApp ordering until the owner configures the payment gateway.'},503);
 let body;
 try{body=await request.json();}catch{return reply({error:'Invalid checkout request.'},400);}
 if(!Array.isArray(body.items)||body.items.length===0||body.items.length>20)return reply({error:'Invalid cart.'},400);
 const used=new Set();const trustedItems=[];
 for(const item of body.items){
  if(!item||typeof item.id!=='string'||used.has(item.id)||!Number.isInteger(item.quantity)||item.quantity<1||item.quantity>50)return reply({error:'Invalid cart quantity.'},400);
  used.add(item.id);const product=products.find(p=>p.id===item.id);
  if(!product||!Number.isInteger(product.price)||product.price<=0)return reply({error:'Invalid product.'},400);
  trustedItems.push({...product, quantity:item.quantity}); // trusted server prices only
 }
 const {totalPaise: amount, discountPaise, milkLitres} = calculateOrder(trustedItems);
 if(amount<100||amount>50000000)return reply({error:'Unsupported order amount.'},400);
 const order=await razorpay('/orders',env,{method:'POST',body:JSON.stringify({amount,currency:'INR',receipt:crypto.randomUUID().slice(0,30),notes:{source:'nanda-dairy-farm',products:body.items.map(x=>`${x.id}:${x.quantity}`).join(',')}})});
 return reply({keyId:env.RAZORPAY_KEY_ID,orderId:order.id,amount:order.amount,discountPaise,milkLitres});
}
async function verifyPayment(request,env){
 if(!configured(env))return reply({error:'Payments unavailable.'},503);
 let b;try{b=await request.json();}catch{return reply({error:'Invalid payment response.'},400);}
 const {razorpay_payment_id:pid,razorpay_order_id:oid,razorpay_signature:sig}=b||{};
 if(!validId(pid)||!validId(oid)||typeof sig!=='string'||!/^[a-fA-F0-9]{64}$/.test(sig))return reply({error:'Invalid payment verification fields.'},400);
 const bytes=new TextEncoder();
 const key=await crypto.subtle.importKey('raw',bytes.encode(env.RAZORPAY_KEY_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const computed=new Uint8Array(await crypto.subtle.sign('HMAC',key,bytes.encode(`${oid}|${pid}`)));
 const supplied=new Uint8Array(sig.match(/.{2}/g).map(h=>parseInt(h,16)));
 let mismatch=0;for(let i=0;i<computed.length;i++)mismatch|=computed[i]^supplied[i];
 if(mismatch!==0)return reply({error:'Payment signature verification failed.'},400);
 const payment=await razorpay(`/payments/${encodeURIComponent(pid)}`,env);
 const order=await razorpay(`/orders/${encodeURIComponent(oid)}`,env);
 if(payment.order_id!==oid||payment.currency!=='INR'||!['captured'].includes(payment.status)||payment.amount!==order.amount||order.currency!=='INR'||order.notes?.source!=='nanda-dairy-farm')return reply({error:'Payment not captured or does not match the order. Check payment status before retrying.'},409);
 // In a real fulfillment system, persist order/payment details and use webhooks.
 // This verifies payment state but is NOT an order-fulfillment database.
 return reply({verified:true,paymentId:pid});
}

const farmKnowledge = `Assistant name: Nia.
Milk-volume promotion: EXAMPLE ${VOLUME_DISCOUNT_RATE * 100}% discount on the combined cow-and-buffalo milk subtotal only when ordered quantity is MORE THAN ${VOLUME_DISCOUNT_MIN_LITRES} litres (6 L qualifies, exactly 5 L does not). This offer is illustrative until confirmed by the farm. The cart and checkout compute the offer using server-verified prices. Prices appear in product-photo popups, not product-card price rows.
NANDA DAIRY FARM WEBSITE INFORMATION
Products listed on website (sample prices only): ${products.map(p=>`${p.name}: INR ${p.price} per ${p.unit}. ${p.description}`).join(' | ')}.
The home page also mentions fresh ghee, reports, billing. Ghee is NOT currently in the purchasable product catalog. Reports are not available on the website; visitors must request any real report from the farm. The site has no published, verified quality certifications, guaranteed test results, delivery terms or competitor comparisons.
The farm's mission as described on the website: care for animals and people, everyday freshness, community and attentive dairy preparation. Do not claim superiority to competitors.
Ordering: visitors can select quantities in the product cart and contact via WhatsApp. Online payments depend on the owner's payment-gateway configuration. Displayed prices are explicitly examples, not verified live prices.
Contacts: details are configured in src/config.js and may be placeholders; never present unverified contact/location data as confirmed. Refer visitors to the contact section and suggest asking the owner.
`; 
async function farmAIChat(request,env) {
 let body;
 try {body=await request.json();} catch {return reply({error:'Invalid chat request.'},400);}
 const message=typeof body.message==='string'?body.message.trim():'';
 if(!message||message.length>500)return reply({error:'Please enter a question of up to 500 characters.'},400);
 const history=Array.isArray(body.history)?body.history.slice(-6).filter(x=>x&&['user','assistant'].includes(x.role)&&typeof x.content==='string').map(x=>({role:x.role,content:x.content.slice(0,500)})):[];
 if(!env.AI)return reply({answer:'Live AI is not configured yet. Use the product cards or the farm contact section for help.',mode:'guide'});
 try {
  const result=await env.AI.run('@cf/meta/llama-3.1-8b-instruct-fast', {
   messages:[{role:'system',content:`You are Nia, a friendly and concise Nanda Dairy Farm website chatbot. Answer the visitor's questions using ONLY the following website facts; if unavailable, say you do not know and direct the visitor to contact the farm. Do not invent milk test results, certifications, farm practices, actual availability, farm comparisons, clinical benefits, contact details, or exact prices other than explicitly labeled SAMPLE prices. Never solicit passwords or payment card details. Stay on website, ordering and general dairy-use questions. Reply in the user's language if possible. Keep answers under 130 words.\n${farmKnowledge}`},...history,{role:'user',content:message}],max_tokens:220
  });
  const answer=typeof result?.response==='string'?result.response.trim():'';
  return reply({answer: answer || 'Please contact the farm for that information.',mode:'ai'});
 }catch(error){console.error('Farm AI error',String(error));return reply({answer:'Live AI is temporarily unavailable. You can browse products or contact the farm directly.',mode:'guide'});}
}

export default {
 async fetch(request,env){
  const url=new URL(request.url);
  if(url.pathname.startsWith('/api/')){
   if(request.method!=='POST')return reply({error:'Method not allowed.'},405);
   if(!sameOrigin(request))return reply({error:'Origin not allowed.'},403);
   try{
    if(url.pathname==='/api/chat')return await farmAIChat(request,env);
    if(url.pathname==='/api/create-order')return await createOrder(request,env);
    if(url.pathname==='/api/verify-payment')return await verifyPayment(request,env);
    return reply({error:'Not found.'},404);
   }catch(err){console.error('Payment API error',err.message);return reply({error:'Payment service is unavailable. Please try again later.'},502);}
  }
  return env.ASSETS.fetch(request);
 }
};
