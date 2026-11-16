import './style.css';
import { farm, products } from './config.js';
import { calculateOrder, VOLUME_DISCOUNT_RATE, VOLUME_DISCOUNT_MIN_LITRES } from './pricing.js';
import { themes, defaultTheme } from './themes.js';

const img = (url, alt, className = '', loading = 'lazy') => `<img class="${className}" src="${url}" alt="${alt}" loading="${loading}" />`;
const currency = (value) => `₹${Number(value).toLocaleString('en-IN', {minimumFractionDigits: Number(value)%1 ? 2 : 0, maximumFractionDigits: 2})}`;
const whatsapp = (message) => `https://wa.me/${farm.phone}?text=${encodeURIComponent(message)}`;
const productCard = (product) => `
  <article class="product-card">
    <div class="product-image"><button type="button" class="product-image-button" data-product="${product.id}" aria-label="Learn more about ${product.name}">${img(product.image, product.name)}<span class="image-view-hint">View details ↗</span></button><span class="product-tag">${product.tag}</span></div>
    <div class="product-info"><div class="product-category">${product.category} · ${product.unit}</div><h3>${product.name}</h3><p>${product.description}</p>
    <div class="product-bottom"><div class="price photo-price-hint">Tap photo for price<small> & offers</small></div><button class="round-button add-button" data-id="${product.id}" aria-label="Add ${product.name} to order">+</button></div></div>
  </article>`;

document.querySelector('#app').innerHTML = `
  <header class="site-header"><div class="container nav">
    <a href="#home" class="brand" aria-label="Nanda Dairy Farm home"><span class="brand-icon">🐄</span><span>Nanda Dairy Farm</span></a>
    <nav id="navigation" class="nav-links" aria-label="Main navigation"><a href="#home">Home</a><a href="#products">Our Products</a><a href="#story">Our Story</a><a href="#contact">Contact</a></nav>
    <div class="nav-actions"><button class="cart-open" id="cart-open" type="button" aria-label="Open shopping cart" aria-controls="cart-panel">🛒 Cart <span id="cart-count" class="cart-count">0</span></button><button class="theme-open" id="theme-open" type="button" aria-expanded="false" aria-controls="theme-studio">🎨 Themes <span>▾</span></button><a class="nav-cta" href="#products">Shop Fresh <span>↗</span></a></div><button id="menu-toggle" class="menu-toggle" aria-expanded="false" aria-controls="navigation" aria-label="Toggle menu">☰</button>
  </div></header>
  <main>
    <section class="hero cinematic-hero" id="home" aria-label="Welcome to Nanda Dairy Farm">
      <div class="cinematic-media">
        <img class="hero-image cinematic-poster" src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1800&q=85" alt="Cows in a dairy farm" fetchpriority="high" />
        <video class="cinematic-video" id="hero-video" autoplay muted loop playsinline preload="auto" disablepictureinpicture src="/videos/dairy-farm-v5.mp4" poster="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1800&q=85" aria-label="Dairy cows grazing in sunlight"></video>
        <div class="cinematic-gradient"></div>
      </div>
      <div id="film-status" class="film-status" role="status" hidden>Checking video…</div>
      <div class="dairy-floating-keywords" aria-label="Dairy products and services">
        <button type="button" class="dairy-pill dairy-pill-1" data-keyword="0" aria-label="Learn about Fresh Cow Milk"><i aria-hidden="true"></i>Fresh Cow Milk</button>
        <button type="button" class="dairy-pill dairy-pill-2" data-keyword="1" aria-label="Learn about Buffalo Milk"><i aria-hidden="true"></i>Buffalo Milk</button>
        <button type="button" class="dairy-pill dairy-pill-3" data-keyword="2" aria-label="Learn about Homemade Curd"><i aria-hidden="true"></i>Homemade Curd</button>
        <button type="button" class="dairy-pill dairy-pill-4" data-keyword="3" aria-label="Learn about Fresh Paneer"><i aria-hidden="true"></i>Fresh Paneer</button>
        <button type="button" class="dairy-pill dairy-pill-5" data-keyword="4" aria-label="Learn about Fresh Ghee"><i aria-hidden="true"></i>Fresh Ghee</button>
        <button type="button" class="dairy-pill dairy-pill-6" data-keyword="5" aria-label="Learn about Reports"><i aria-hidden="true"></i>Reports</button>
        <button type="button" class="dairy-pill dairy-pill-7" data-keyword="6" aria-label="Learn about Billing"><i aria-hidden="true"></i>Billing</button>
      </div>
      <button class="nanda-orbit-play" id="nanda-orbit-play" type="button" aria-label="Watch Nia’s guided product tour" aria-haspopup="dialog" aria-controls="nia-tour-dialog" title="Watch Nia introduce our dairy products"><span id="nanda-play-icon" aria-hidden="true">▶</span></button>
      <div class="cinematic-content container">
        <div class="cinematic-glass">
          <div class="hero-kicker"><span class="kicker-dot"></span> FRESH FROM NANDA DAIRY FARM</div>
          <h1>Farm-fresh dairy, made with care.</h1>
          <p>Fresh cow milk, buffalo milk, homemade curd, paneer and ghee for your family.</p>
          <div class="cinematic-cta"><a class="button cinematic-shop" href="#products">Explore Our Products <span>→</span></a><a class="button cinematic-story" href="#story">Our Farm Story <span>↗</span></a></div>
        </div>
      </div>
    </section>
    <section class="features"><div class="container features-grid"><div><span class="feature-icon">♧</span><div><strong>Farm Fresh</strong><p>Freshness in every sip</p></div></div><div><span class="feature-icon">♡</span><div><strong>Made with Love</strong><p>Care in every batch</p></div></div><div><span class="feature-icon">✧</span><div><strong>Everyday Goodness</strong><p>For the whole family</p></div></div></div></section>
    <section class="section products-section" id="products"><div class="container"><div class="section-head"><div><div class="eyebrow">THE GOOD STUFF</div><h2>Fresh picks from <em>our farm.</em></h2><p>Simple ingredients, delicious everyday essentials.</p></div><span class="price-note">Tap product photos for sample prices & offers</span></div><div class="product-grid">${products.map(productCard).join('')}</div><div class="order-bar"><div><strong>Your farm-fresh basket</strong><span id="cart-status">Choose your favourites to get started.</span></div><button id="order-button" class="button button-primary" type="button">View Cart & Checkout <span>↗</span></button></div></div></section>
    <section class="story-section" id="story"><div class="container story-grid"><div class="story-photos"><div class="story-main">${img('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=85', 'Cow grazing in a meadow')}</div><div class="story-small">${img('https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=650&q=85', 'Green countryside farm')}</div></div><div class="story-copy"><div class="eyebrow">OUR LITTLE STORY</div><h2>Good food starts with <em>good care.</em></h2><p class="story-lead">At Nanda Dairy Farm, our story begins with a simple belief: the everyday food we share with our families deserves attention, honesty, and care.</p><p>Milk is part of so many meaningful moments, from the first cup of tea in the morning to meals shared around the family table. We want to celebrate those moments with dairy products that feel familiar, comforting, and full of farm-fresh goodness.</p><p>Our approach is rooted in respect for the animals, the people who care for them, and the families who choose our products. Thoughtful care, attention to cleanliness, and a commitment to improving what we do guide the way we think about our farm.</p><p>Whether you are looking for milk for your morning routine, curd for a family meal, or paneer for a favourite recipe, we hope every visit feels personal and welcoming. We're always happy to answer questions about our products and listen to what matters to you.</p><div class="story-values" aria-label="What matters to us"><div><span aria-hidden="true">♡</span><strong>Care first</strong><small>Respect for animals and people</small></div><div><span aria-hidden="true">✧</span><strong>Everyday freshness</strong><small>Goodness for family moments</small></div><div><span aria-hidden="true">♧</span><strong>Community spirit</strong><small>Listening, learning, growing</small></div></div><p class="story-closing">Thank you for being part of the Nanda Dairy Farm story. We look forward to growing with the families and community around us.</p><a class="button button-outline" href="#contact">Get in Touch <span>↗</span></a></div></div></section>
    <section class="contact-section" id="contact"><div class="container contact-inner"><div><div class="eyebrow light">SAY HELLO</div><h2>Freshness is just a <em>message away.</em></h2><p>Questions about today's milk or want to place an order? We'd love to hear from you.</p><a class="button button-light" href="${whatsapp('Hello Nanda Dairy Farm! I would like to know more about your products.')}" target="_blank" rel="noopener noreferrer">Chat on WhatsApp <span>↗</span></a></div><div class="contact-details"><div><small>CALL / WHATSAPP</small><strong>${farm.displayPhone}</strong></div><div><small>FIND US</small><strong>${farm.location}</strong></div><div><small>FARM HOURS</small><strong>${farm.hours}</strong></div></div></div></section>
  </main><footer><div class="container footer-inner"><a href="#home" class="brand"><span class="brand-icon">✳</span><span>NANDA <small>DAIRY FARM</small></span></a><p>Pure goodness, every day. © <span id="year"></span> Nanda Dairy Farm.</p><a href="#home">Back to top ↑</a></div></footer>
  <dialog id="nia-tour-dialog" class="nia-tour-dialog" aria-labelledby="nia-tour-title">
    <div class="nia-tour-header">
      <img src="/images/farm-assistant.png" alt="" width="43" height="43" />
      <div><strong id="nia-tour-title">Nia's guided dairy tour</strong><small>English narration · Products, offers and website features</small></div>
      <button type="button" id="nia-tour-close" class="nia-tour-close" aria-label="Close Nia's tour">✕</button>
    </div>
    <video id="nia-tour-video" class="nia-tour-video" playsinline preload="none" controls poster="/images/nia-tour-poster.png" aria-label="Nia guides visitors through Nanda Dairy Farm products in English">
      <source src="/videos/nia-product-tour.mp4" type="video/mp4" />
      Your browser does not support video playback.
    </video>
    <p class="nia-tour-note">Nia's narrated tour is an illustrated guide, not live video. Prices and the milk offer shown on this website are examples; please confirm details with the farm.</p>
  </dialog>
  <dialog id="info-dialog" class="nanda-info-dialog" aria-labelledby="info-title">
    <button type="button" id="info-close" class="nanda-info-close" aria-label="Close details">✕</button>
    <img id="info-image" class="nanda-info-image" alt="" hidden />
    <span id="info-label" class="nanda-info-eyebrow">FROM OUR FARM</span>
    <h2 id="info-title"></h2>
    <p id="info-desc"></p>
    <div id="info-pricing" class="nanda-product-pricing" hidden></div>
    <h3>Why choose this from Nanda Dairy Farm?</h3>
    <p id="info-reason"></p>
    <h3>How does it compare?</h3>
    <p id="info-compare"></p>
    <p class="nanda-info-note">Product details describe our offerings. Availability, sourcing, processing, testing and prices should be confirmed with the farm before ordering.</p>
    <div class="nanda-info-actions"><a id="info-shop" href="#products" class="button button-primary">Explore products ↗</a><button id="info-chat" type="button" class="button button-outline">Ask Nia</button></div>
  </dialog>
  <button id="farm-ai-launcher" type="button" class="farm-ai-launcher" aria-label="Chat with Nia, Nanda Farm AI assistant" aria-controls="farm-ai-panel" aria-expanded="false"><img src="/images/farm-assistant.png" alt="" /><span>Ask Nia</span></button>
  <section id="farm-ai-panel" class="farm-ai-panel" role="dialog" aria-label="Nia, Nanda Dairy Farm assistant" aria-modal="false" hidden>
    <div class="farm-ai-header"><img src="/images/farm-assistant.png" alt="" /><div><strong>Nia · Farm Assistant</strong><small>Ask about products and orders</small></div><button type="button" id="farm-ai-close" aria-label="Close chat">✕</button></div>
    <div id="farm-ai-messages" class="farm-ai-messages" role="log" aria-live="polite" aria-relevant="additions"><div class="farm-ai-bubble farm-ai-bot">Hi, I'm Nia! 👋 I can help with our dairy products, photo-only sample prices, milk volume offers, ordering and general farm information. What would you like to know?</div></div>
    <div class="farm-ai-suggestions"><button type="button" data-ask="What products do you offer?">Our products</button><button type="button" data-ask="Why choose Nanda Dairy Farm?">Why choose us?</button><button type="button" data-ask="How do I place an order?">How to order?</button></div>
    <form id="farm-ai-form" class="farm-ai-form"><input id="farm-ai-input" name="question" type="text" maxlength="500" autocomplete="off" placeholder="Ask about our farm..." aria-label="Your question" required /><button type="submit" aria-label="Send message">➤</button></form>
    <small class="farm-ai-disclaimer">AI-generated answers may be mistaken. Confirm prices, availability and product claims with the farm.</small>
  </section>
  <aside class="cart-panel" id="cart-panel" aria-label="Shopping cart" role="dialog" aria-modal="true" aria-labelledby="cart-title" hidden>
    <div class="panel-heading"><div><span class="theme-overline">YOUR BASKET</span><h3 id="cart-title">My shopping cart</h3><p>Review quantities and choose how to order.</p></div><button id="cart-close" class="theme-close" type="button" aria-label="Close shopping cart">✕</button></div>
    <div id="cart-items" class="cart-items"></div>
    <div class="cart-discount" id="cart-discount" hidden></div>
    <div class="cart-total"><span>Estimated total</span><strong id="cart-total">₹0</strong></div>
    <p class="checkout-hint">Volume offer: ${VOLUME_DISCOUNT_RATE * 100}% off the milk subtotal when you order more than 5 litres of cow and/or buffalo milk combined (example promotion; confirm with the farm). Product prices are examples until the farm owner updates them. Shipping/availability will be confirmed separately.</p>
    <div class="checkout-actions"><button id="pay-button" class="button button-primary" type="button">Pay by UPI / Card ↗</button><button id="whatsapp-button" class="button button-outline" type="button">Order enquiry on WhatsApp ↗</button></div>
    <p class="checkout-status" id="checkout-status" role="status" aria-live="polite"></p>
  </aside>
  <div class="cart-shade" id="cart-shade" hidden></div>
  <aside class="theme-studio" id="theme-studio" aria-label="Website appearance" hidden>
    <div class="theme-studio-head"><div><span class="theme-overline">DESIGN STUDIO</span><h3>Make it yours</h3><p>Choose from 10 color palettes, cow photos and photos featuring people on farms. Products, prices and story content stay the same. The panel stays open while you preview.</p></div><button class="theme-close" id="theme-close" type="button" aria-label="Close customization panel">✕</button></div>
    <div class="theme-options" id="theme-options"></div>
    <p class="theme-help">Your choice stays saved in this browser. To make it the default for everyone, update <code>defaultTheme</code> in <code>src/themes.js</code> and push to GitHub.</p>
    <button type="button" class="theme-reset" id="theme-reset">↺ Reset to site default</button>
  </aside>
  <div class="theme-shade" id="theme-shade" hidden></div>
  <button class="contact-float" type="button" id="contact-float" aria-label="Open farm contact details">✉ <span>Contact Farm</span></button>
  <div class="welcome-shade" id="welcome-shade" hidden></div>
  <section class="welcome-modal" id="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title" hidden>
    <button type="button" class="welcome-close" id="welcome-close" aria-label="Close contact details">✕</button>
    <div class="welcome-media" aria-hidden="true"><img id="welcome-image" src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=85" alt="" /></div>
    <div class="welcome-copy">
      <span class="welcome-overline">HELLO FROM THE FARM ✦</span>
      <h2 id="welcome-title">Fresh milk, <em>a message away.</em></h2>
      <p>We're happy to answer questions about our dairy products, prices and availability.</p>
      <div class="welcome-meta"><div><small>CALL / WHATSAPP</small><strong>${farm.displayPhone}</strong></div><div><small>FIND US</small><strong>${farm.location}</strong></div><div><small>FARM HOURS</small><strong>${farm.hours}</strong></div></div>
      <a class="welcome-whatsapp" target="_blank" rel="noopener noreferrer" href="${whatsapp('Hello Nanda Dairy Farm! Please share today\'s milk prices and availability.')}">Message us on WhatsApp ↗</a>
      <button type="button" class="welcome-later" id="welcome-later">Maybe later</button>
    </div>
  </section>
  <div id="toast" class="toast" role="status" aria-live="polite"></div>
`;

document.querySelector('#year').textContent = new Date().getFullYear();
const cart = new Map();
try {
  const saved = JSON.parse(localStorage.getItem('nanda-cart') || '{}');
  for (const [id, count] of Object.entries(saved)) if (products.some(p => p.id === id) && Number.isInteger(count) && count > 0 && count <= 50) cart.set(id, count);
} catch { /* private browsing */ }
const orderButton = document.querySelector('#order-button');
const cartStatus = document.querySelector('#cart-status');
const toast = document.querySelector('#toast');
const cartPanel = document.querySelector('#cart-panel');
const cartShade = document.querySelector('#cart-shade');
const cartItems = document.querySelector('#cart-items');
const checkoutStatus = document.querySelector('#checkout-status');
let toastTimeout;
let checkoutPending = false;
function notify(message) { toast.textContent = message; toast.classList.add('visible'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => toast.classList.remove('visible'), 2500); }
function cartLines() { return products.filter(p => cart.has(p.id)).map(p => ({...p, quantity:cart.get(p.id)})); }
function cartPricing() { return calculateOrder(cartLines()); }
function cartTotal() { return cartPricing().totalPaise / 100; }
function saveCart() { try { localStorage.setItem('nanda-cart', JSON.stringify(Object.fromEntries(cart))); } catch {} }
function updateCart() {
  const count = [...cart.values()].reduce((sum,q)=>sum+q,0);
  cartStatus.textContent = count ? `${count} item${count === 1?'':'s'} · Estimated total ${currency(cartTotal())}` : 'Choose your favourites to get started.';
  document.querySelector('#cart-count').textContent = count;
  const pricing = cartPricing();
  document.querySelector('#cart-total').textContent = currency(cartTotal());
  const discountRow = document.querySelector('#cart-discount');
  discountRow.hidden = pricing.discountPaise === 0;
  discountRow.textContent = pricing.discountPaise ? `Milk volume offer (${pricing.milkLitres} L): −${currency(pricing.discountPaise / 100)} (${VOLUME_DISCOUNT_RATE * 100}% off)` : '';
  document.querySelector('#pay-button').disabled = count === 0 || checkoutPending;
  document.querySelector('#whatsapp-button').disabled = count === 0;
  cartItems.innerHTML = count ? cartLines().map(p => `<div class="cart-item"><img src="${p.image}" alt="" loading="lazy"><div class="cart-item-info"><strong>${p.name}</strong><small>${p.unit} · ${currency(p.price)} each</small><div class="quantity-control"><button type="button" data-action="minus" data-id="${p.id}" aria-label="Remove one ${p.name}">−</button><span>${p.quantity}</span><button type="button" data-action="plus" data-id="${p.id}" aria-label="Add one ${p.name}">+</button><button class="remove-item" type="button" data-action="remove" data-id="${p.id}">Remove</button></div></div><strong>${currency(p.price*p.quantity)}</strong></div>`).join('') : '<div class="empty-cart">🛒<h4>Your cart is empty</h4><p>Choose fresh dairy products and tap + to add them.</p></div>';
  saveCart();
}
function setCartOpen(open) { cartPanel.hidden=!open; cartShade.hidden=!open; document.body.classList.toggle('cart-panel-open',open); if(open) { toggleThemeStudio(false); document.querySelector('#cart-close').focus(); } }
document.querySelector('#cart-open').addEventListener('click',()=>setCartOpen(true));
orderButton.addEventListener('click',()=>setCartOpen(true));
document.querySelector('#cart-close').addEventListener('click',()=>setCartOpen(false));
cartShade.addEventListener('click',()=>setCartOpen(false));
document.querySelectorAll('.add-button').forEach(button => button.addEventListener('click',()=>{
  const p=products.find(p=>p.id===button.dataset.id); if(!p) return;
  cart.set(p.id,Math.min(50,(cart.get(p.id)||0)+1)); updateCart(); notify(`${p.name} added to your cart`);
}));
cartItems.addEventListener('click',e=>{
 const button=e.target.closest('[data-action]'); if(!button)return;
 const id=button.dataset.id, current=cart.get(id)||0;
 const next=button.dataset.action==='plus'?Math.min(50,current+1):button.dataset.action==='minus'?current-1:0;
 if(next>0)cart.set(id,next);else cart.delete(id);
 checkoutStatus.textContent=''; updateCart();
});
document.querySelector('#whatsapp-button').addEventListener('click',()=>{
 if(!cart.size)return;
 const lines=cartLines().map(p=>`${p.name} (${p.unit}) × ${p.quantity} — ${currency(p.price*p.quantity)}`);
 const message=`Hello Nanda Dairy Farm! I would like to enquire about this order:\n\n${lines.join('\n')}\n\nMilk volume discount: ${currency(cartPricing().discountPaise / 100)}\nEstimated total: ${currency(cartTotal())}\n\nPlease confirm availability, final prices and delivery details.`;
 window.open(whatsapp(message),'_blank','noopener,noreferrer');
});
let razorpayScript;
function loadCheckout() {
 if(razorpayScript)return razorpayScript;
 razorpayScript=new Promise((resolve,reject)=>{
  const script=document.createElement('script'); script.src='https://checkout.razorpay.com/v1/checkout.js'; script.onload=resolve; script.onerror=()=>reject(new Error('Payment checkout could not load.')); document.head.appendChild(script);
 }); return razorpayScript;
}
const payButton=document.querySelector('#pay-button');
payButton.addEventListener('click',async()=>{
 if(!cart.size||checkoutPending)return;
 checkoutPending=true; updateCart(); checkoutStatus.textContent='Connecting to secure payment checkout…';
 try {
  const response=await fetch('/api/create-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:cartLines().map(p=>({id:p.id,quantity:p.quantity}))})});
  const body=await response.json();
  if(!response.ok)throw new Error(body.error||'Payments are not available yet.');
  await loadCheckout();
  if(!window.Razorpay)throw new Error('Payment checkout is unavailable.');
  const checkout=new window.Razorpay({
   key:body.keyId,amount:body.amount,currency:'INR',name:farm.name,description:'Dairy products',order_id:body.orderId,
   theme:{color:getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim()||'#20553d'},
   handler:async(result)=>{
    checkoutStatus.textContent='Verifying payment with the provider…';
    try {
     const confirm=await fetch('/api/verify-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(result)});
     const verification=await confirm.json(); if(!confirm.ok)throw new Error(verification.error||'Verification failed');
     checkoutStatus.textContent=`Payment verified (${verification.paymentId}). Contact the farm to confirm fulfilment and delivery.`;
     cart.clear(); updateCart();
    } catch(err) { checkoutStatus.textContent=`Payment not confirmed: ${err.message}. Check your payment history and contact the farm before retrying.`; }
   },
   modal:{ondismiss:()=>{checkoutStatus.textContent='Payment window closed. Your cart is saved.';}}
  });
  checkout.on('payment.failed',()=>{checkoutStatus.textContent='Payment did not complete. Please try again or contact the farm.';});
  checkout.open(); checkoutStatus.textContent='Choose UPI or Card in the secure payment window.';
 } catch(err) {checkoutStatus.textContent=err.message;}
 finally {checkoutPending=false;updateCart();}
});
updateCart();
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#navigation');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.textContent = open ? '✕' : '☰'; });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰'; }));


// Theme Studio: presentation-only switching. Existing product data and ordering logic are untouched.
const themeStudio = document.querySelector('#theme-studio');
const themeShade = document.querySelector('#theme-shade');
const themeOpen = document.querySelector('#theme-open');
const themeOptions = document.querySelector('#theme-options');
const storedTheme = (() => { try { return localStorage.getItem('nanda-dairy-theme'); } catch { return null; } })();
let currentTheme = themes[storedTheme] ? storedTheme : defaultTheme;
const themePhoto = (url) => `${url}?auto=format&fit=crop&w=1400&q=85`;
function renderThemeChoices() {
  themeOptions.innerHTML = Object.entries(themes).map(([id, theme]) => `
    <button type="button" class="theme-option ${id === currentTheme ? 'active' : ''}" data-theme="${id}" aria-pressed="${id === currentTheme}">
      <img src="${themePhoto(theme.hero)}" alt="${theme.name} theme preview" loading="lazy" />
      <span class="theme-option-details"><strong>${theme.name}</strong><small>${theme.subtitle}</small></span>
      <span class="theme-palette"><i style="background:${theme.primary}"></i><i style="background:${theme.accent}"></i><i style="background:${theme.surface}"></i></span>
    </button>`).join('');
}
function applyTheme(id) {
  if (!themes[id]) return;
  currentTheme = id;
  const theme = themes[id];
  document.documentElement.dataset.theme = id;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--theme-primary', theme.primary);
  rootStyle.setProperty('--theme-deep', theme.deep);
  rootStyle.setProperty('--theme-accent', theme.accent);
  rootStyle.setProperty('--theme-surface', theme.surface);
  rootStyle.setProperty('--theme-story', theme.storyBg);
  rootStyle.setProperty('--theme-paper', theme.paper);
  const poster = document.querySelector('.cinematic-poster');
  const video = document.querySelector('#hero-video');
  poster.src = themePhoto(theme.hero);
  poster.alt = `${theme.name}: farm and dairy lifestyle photography`;
  const featurePhoto=document.querySelector('#theme-feature-photo');
  if(featurePhoto) featurePhoto.src=themePhoto(theme.hero);
  const orbitPoster = document.querySelector('#orbit-video-fallback');
  const orbitVideo = document.querySelector('#orbit-video');
  if (orbitPoster) orbitPoster.src = themePhoto(theme.hero);
  if (orbitVideo) orbitVideo.poster = themePhoto(theme.hero);
  video.poster = themePhoto(theme.hero);
  // All themes use the bundled MP4. Never restart the video when switching themes.
  const newSrc = '/videos/dairy-farm-v5.mp4';
  if (video.dataset.source !== newSrc) {
    video.dataset.source = newSrc;
    video.src = newSrc;
    video.load();
  }
  document.querySelector('#welcome-image').src = themePhoto(theme.detail);
  document.querySelector('.story-main img').src = themePhoto(theme.story);
  document.querySelector('.story-small img').src = themePhoto(theme.detail);
  document.querySelector('.story-small img').alt = 'People and farm lifestyle stock photography';
  try { localStorage.setItem('nanda-dairy-theme', id); } catch { /* storage can be disabled */ }
  themeOptions.querySelectorAll('[data-theme]').forEach(button => {
    const selected=button.dataset.theme===id;
    button.classList.toggle('active',selected);
    button.setAttribute('aria-pressed',String(selected));
  });
}
function toggleThemeStudio(open) {
  themeStudio.hidden = !open;
  themeShade.hidden = !open;
  themeOpen.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('theme-studio-open', open);
  if (open) setCartOpen(false);
}
themeOpen.addEventListener('click', () => toggleThemeStudio(themeStudio.hidden));
document.querySelector('#theme-close').addEventListener('click', () => toggleThemeStudio(false));
themeShade.addEventListener('click', () => toggleThemeStudio(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { toggleThemeStudio(false); setCartOpen(false); } });
themeOptions.addEventListener('click', (event) => {
  const button = event.target.closest('[data-theme]');
  if (button) { applyTheme(button.dataset.theme); notify(`${themes[button.dataset.theme].name} theme selected`); }
});
document.querySelector('#theme-reset').addEventListener('click', () => { applyTheme(defaultTheme); notify('Default theme restored'); });
renderThemeChoices();
// If a stock image cannot load, show our reliable cow poster rather than a broken icon.
const fallbackPhoto='https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80';
document.addEventListener('error',(event)=>{const el=event.target;if(el instanceof HTMLImageElement && !el.dataset.fallback){el.dataset.fallback='true';el.src=fallbackPhoto;}},true);
applyTheme(currentTheme);

// V10: Animate each pill around a fixed point; never rotate/move its parent.
// This avoids conflicting CSS transforms on desktop and responsive breakpoints.
const keywordOrbit = document.querySelector('#home .dairy-floating-keywords');
const keywordPills = [...document.querySelectorAll('#home .dairy-floating-keywords .dairy-pill')];
const keywordHero = document.querySelector('#home');
const keywordReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const keywordOrbitDuration = 42000; // 42 seconds for one clockwise revolution
const keywordOrbitStart = performance.now();
let keywordOrbitRadius = 130;
function measureKeywordOrbit() {
  // Diameter stays inside the centered part of the hero, including on laptops/mobile.
  keywordOrbitRadius = Math.max(60, Math.min(172, (window.innerWidth - 185) / 2, keywordHero.clientHeight * .20));
}
function renderKeywordOrbit(now) {
  if (!keywordOrbit || keywordPills.length === 0) return;
  const phase = keywordReducedMotion.matches ? 0 : ((now - keywordOrbitStart) % keywordOrbitDuration) / keywordOrbitDuration * Math.PI * 2;
  keywordPills.forEach((pill, index) => {
    const angle = -Math.PI / 2 + index * 2 * Math.PI / keywordPills.length + phase;
    const x = Math.cos(angle) * keywordOrbitRadius;
    const y = Math.sin(angle) * keywordOrbitRadius;
    // Important: translate only. There is no text rotation, so words always face forward.
    pill.style.setProperty('left', '0px', 'important');
    pill.style.setProperty('top', '0px', 'important');
    pill.style.setProperty('right', 'auto', 'important');
    pill.style.setProperty('bottom', 'auto', 'important');
    pill.style.setProperty('transform', `translate(-50%, -50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`, 'important');
  });
  requestAnimationFrame(renderKeywordOrbit);
}
measureKeywordOrbit();
window.addEventListener('resize', measureKeywordOrbit, { passive: true });
requestAnimationFrame(renderKeywordOrbit);

// Self-hosted background video. Never reassign its URL during theme changes.
const farmFilm = document.querySelector('#hero-video');
const heroSection = document.querySelector('#home');
const orbitPlayButton = document.querySelector('#nanda-orbit-play');
const niaTourDialog = document.querySelector('#nia-tour-dialog');
const niaTourVideo = document.querySelector('#nia-tour-video');
const niaTourClose = document.querySelector('#nia-tour-close');
let manuallyPausedFilm = false;
// The center yellow button now opens Nia's actual pre-recorded product tour.
// The separate cow background video continues to play at its original 0.5x speed.
function closeNiaTour() {
  niaTourVideo.pause();
  niaTourVideo.currentTime = 0;
  if (niaTourDialog.open) niaTourDialog.close();
}
orbitPlayButton?.addEventListener('click', async () => {
  if (!niaTourDialog.open) niaTourDialog.showModal();
  niaTourVideo.currentTime = 0;
  try { await niaTourVideo.play(); }
  catch (error) { console.info('Nia tour: use the video Play control to start narration.', error); }
});
niaTourClose.addEventListener('click', closeNiaTour);
niaTourDialog.addEventListener('cancel', (event) => { event.preventDefault(); closeNiaTour(); });
niaTourDialog.addEventListener('click', (event) => {
  if (event.target === niaTourDialog) closeNiaTour();
});
niaTourVideo.addEventListener('ended', () => { niaTourVideo.currentTime = 0; });

const heroVisible = () => {
  const rect = heroSection.getBoundingClientRect();
  return !document.hidden && rect.bottom > 0 && rect.top < window.innerHeight * 0.85;
};
const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const filmStatus = document.querySelector('#film-status');
function filmMessage(message) {
  console.info('[Nanda Dairy video]', message, farmFilm.currentSrc, 'readyState=', farmFilm.readyState);
  if (filmStatus) filmStatus.textContent = message;
}
function tryPlayFilm() {
  if (manuallyPausedFilm) return;
  if (!heroVisible()) {
    farmFilm.pause();
    farmFilm.classList.remove('is-playing');
    return;
  }
  if (prefersLessMotion.matches) {
    farmFilm.pause();
    farmFilm.classList.remove('is-playing');
    filmMessage('Reduced motion preference enabled; showing still photo.');
    return;
  }
  farmFilm.muted = true;
  farmFilm.playbackRate = 0.5; // 0.5x speed for the home background cow video
  farmFilm.defaultMuted = true;
  farmFilm.playsInline = true;
  const promise = farmFilm.play();
  if (promise && typeof promise.catch === 'function') {
    promise.catch(e => {
      farmFilm.classList.remove('is-playing');
      filmMessage('Autoplay blocked or video unavailable: ' + e.name);
    });
  }
}
farmFilm.addEventListener('playing', () => {
  farmFilm.classList.add('is-playing');
  filmMessage('Playing');
});
farmFilm.addEventListener('error', () => {
  farmFilm.classList.remove('is-playing');
  filmMessage('Unable to load MP4 (code ' + (farmFilm.error?.code || 'unknown') + ').');
});
farmFilm.addEventListener('loadedmetadata', () => { farmFilm.playbackRate = 0.5; });
farmFilm.addEventListener('loadeddata', tryPlayFilm);
farmFilm.addEventListener('pause', () => farmFilm.classList.remove('is-playing'));
prefersLessMotion.addEventListener?.('change', tryPlayFilm);
document.addEventListener('visibilitychange', tryPlayFilm);
const homeVideoObserver = new IntersectionObserver(() => tryPlayFilm(), { threshold: [0, 0.15, 0.5] });
homeVideoObserver.observe(heroSection);
tryPlayFilm();
// Secondary round film: intentionally muted, with photo fallback if unavailable.
const orbitVideo = document.querySelector('#orbit-video');
const orbitWrap = document.querySelector('.orbit-video-wrap');
function tryPlayOrbitVideo() {
  if (!orbitVideo || prefersLessMotion.matches) return;
  orbitVideo.muted = true;
  orbitVideo.playbackRate = 0.5; // Match the circular cow video to the background video
  orbitVideo.playsInline = true;
  const result = orbitVideo.play();
  if (result?.catch) result.catch(() => orbitWrap?.classList.remove('orbit-playing'));
}
if (orbitVideo) {
  orbitVideo.addEventListener('loadedmetadata', () => { orbitVideo.playbackRate = 0.5; });
  orbitVideo.addEventListener('playing', () => orbitWrap?.classList.add('orbit-playing'));
  orbitVideo.addEventListener('error', () => orbitWrap?.classList.remove('orbit-playing'));
  document.addEventListener('visibilitychange', () => {if (!document.hidden) tryPlayOrbitVideo();});
  tryPlayOrbitVideo();
}
// Add ?videoDebug=1 to the homepage URL to display the playback status.
if (new URLSearchParams(location.search).has('videoDebug')) { filmStatus.hidden = false; }

// Elegant contact popup: automatically opens once per browser session.
// Doesn't close theme studio or shopping cart when visitors change themes.
const welcomeModal = document.querySelector('#welcome-modal');
const welcomeShade = document.querySelector('#welcome-shade');
const welcomeClose = document.querySelector('#welcome-close');
let welcomeFocusReturn = null;
function welcomeOpen() {
  if (!welcomeModal.hidden || !themeStudio.hidden || !cartPanel.hidden) return;
  welcomeFocusReturn = document.activeElement;
  welcomeModal.hidden = false;
  welcomeShade.hidden = false;
  document.body.classList.add('welcome-open');
  welcomeClose.focus();
}
function welcomeDismiss() {
  welcomeModal.hidden = true;
  welcomeShade.hidden = true;
  document.body.classList.remove('welcome-open');
  if (welcomeFocusReturn?.isConnected && welcomeFocusReturn !== document.body) welcomeFocusReturn.focus();
}
welcomeClose.addEventListener('click', welcomeDismiss);
welcomeShade.addEventListener('click', welcomeDismiss);
document.querySelector('#welcome-later').addEventListener('click', welcomeDismiss);
document.querySelector('#contact-float').addEventListener('click', welcomeOpen);
document.addEventListener('keydown', e => {if(e.key==='Escape' && !welcomeModal.hidden) welcomeDismiss();});
// Show automatically after 4 seconds, once per browser tab session.
let greeted = false;
try { greeted = sessionStorage.getItem('nanda-welcome-seen') === 'yes'; } catch {}
if (!greeted) {
  window.setTimeout(() => {
    try { sessionStorage.setItem('nanda-welcome-seen', 'yes'); } catch {}
    welcomeOpen();
  }, 4000);
}


// V11 — Clickable keyword details, product images and Nanda Farm assistant.
const detailsByKeyword = [
  {title:'Fresh Cow Milk',product:'cow',reason:'A familiar everyday choice for tea, breakfast and home cooking. Ask us about current freshness and delivery details.',compare:'Cow and buffalo milk differ in natural richness and typical culinary uses. Choose based on taste and what you plan to prepare.'},
  {title:'Buffalo Milk',product:'buffalo',reason:'A rich, creamy option often chosen for thick curd, tea and desserts.',compare:'Buffalo milk is typically richer than cow milk. The best choice depends on your taste and recipe; check the current product details with us.'},
  {title:'Homemade Curd',product:'curd',reason:'Convenient, ready-to-enjoy curd for meals, rice and side dishes.',compare:'Curd is ready to serve, while milk can be used for drinks or cooking. Ask how our current batch is prepared and stored.'},
  {title:'Fresh Paneer',product:'paneer',reason:'A versatile ingredient for curries, snacks and family meals.',compare:'Paneer is a soft cheese used in cooking, unlike curd which is usually eaten as a side or base. Choose according to your recipe.'},
  {title:'Fresh Ghee',reason:'Ask us about ghee availability, ingredients, preparation and current price before buying.',compare:'Ghee is mainly used for cooking and flavor, while milk, curd and paneer serve different roles in meals.'},
  {title:'Reports',reason:'Have a question about milk quality or test reports? Contact the farm to request any reports available for the specific product or batch.',compare:'Do not rely on unverified quality claims. Ask for actual dated documentation when comparing suppliers.'},
  {title:'Billing',reason:'You can review your basket on this website and contact us to confirm the total and order details.',compare:'Checkout and delivery arrangements can vary between sellers. We recommend confirming the final bill and delivery details directly.'}
];
const infoDialog = document.querySelector('#info-dialog');
const infoImage = document.querySelector('#info-image');
const infoPricing = document.querySelector('#info-pricing');
const infoClose = document.querySelector('#info-close');
let lastInfoTrigger = null;
function openInformation(detail, trigger, product = null) {
  if (!detail) return;
  lastInfoTrigger = trigger;
  document.querySelector('#info-title').textContent = detail.title;
  document.querySelector('#info-label').textContent = product ? 'THE GOOD STUFF · PRODUCT DETAILS' : 'DISCOVER OUR FARM';
  document.querySelector('#info-desc').textContent = product?.description || detail.description || 'Discover how this fits into your daily dairy routine.';
  document.querySelector('#info-reason').textContent = detail.reason;
  document.querySelector('#info-compare').textContent = detail.compare;
  infoPricing.hidden = !product;
  if (product) {
    const milkProduct = product.unit === '1 litre' && ['cow','buffalo'].includes(product.id);
    infoPricing.textContent = `Sample price: ${currency(product.price)} per ${product.unit}. ` + (milkProduct ? `Milk volume offer: ${VOLUME_DISCOUNT_RATE * 100}% off the combined milk subtotal when you buy MORE THAN ${VOLUME_DISCOUNT_MIN_LITRES} litres of cow and/or buffalo milk in one order. Add quantities in the cart to see your savings. ` : `This item is not part of the milk volume discount. `) + 'Prices and offers must be confirmed with the farm before purchase.';
    infoImage.src = product.image; infoImage.alt = product.name; infoImage.hidden = false; }
  else { infoImage.hidden = true; infoImage.removeAttribute('src'); }
  infoDialog.showModal();
}
document.querySelectorAll('#home [data-keyword]').forEach(button => button.addEventListener('click', () => {
  const detail = detailsByKeyword[Number(button.dataset.keyword)];
  openInformation(detail, button, detail.product ? products.find(p => p.id === detail.product) : null);
}));
document.querySelectorAll('.product-image-button[data-product]').forEach(button => button.addEventListener('click', () => {
  const product = products.find(p => p.id === button.dataset.product);
  if (!product) return;
  const extra = detailsByKeyword.find(d => d.product === product.id);
  openInformation({...extra, title: product.name, description: `${product.description} • ${product.unit}. Display price: ${currency(product.price)} (sample, confirm before ordering).`}, button, product);
}));
infoClose.addEventListener('click', () => infoDialog.close());
infoDialog.addEventListener('click', event => { if (event.target === infoDialog) infoDialog.close(); });
infoDialog.addEventListener('close', () => lastInfoTrigger?.focus());
document.querySelector('#info-shop').addEventListener('click', () => infoDialog.close());

const aiLauncher = document.querySelector('#farm-ai-launcher');
const aiPanel = document.querySelector('#farm-ai-panel');
const aiMessages = document.querySelector('#farm-ai-messages');
const aiInput = document.querySelector('#farm-ai-input');
const aiForm = document.querySelector('#farm-ai-form');
const aiHistory = [];
let aiPending = false;
function toggleFarmAssistant(open) {
  aiPanel.hidden = !open;
  aiLauncher.setAttribute('aria-expanded', String(open));
  if (open) aiInput.focus(); else aiLauncher.focus();
}
aiLauncher.addEventListener('click', () => toggleFarmAssistant(aiPanel.hidden));
document.querySelector('#farm-ai-close').addEventListener('click', () => toggleFarmAssistant(false));
document.querySelector('#info-chat').addEventListener('click', () => { infoDialog.close(); toggleFarmAssistant(true); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !aiPanel.hidden) toggleFarmAssistant(false); });
function appendAIMessage(message, who) {
  const bubble = document.createElement('div');
  bubble.className = `farm-ai-bubble ${who === 'user' ? 'farm-ai-user' : 'farm-ai-bot'}`;
  bubble.textContent = message;
  aiMessages.append(bubble);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  return bubble;
}
function localFarmAnswer(question) {
  const q=question.toLowerCase();
  if (/discount|offer|5\s*(l|litre|liter)|bulk|volume|save/.test(q)) return `Example milk offer: ${VOLUME_DISCOUNT_RATE * 100}% off the milk subtotal when your combined cow and buffalo milk quantity is more than ${VOLUME_DISCOUNT_MIN_LITRES} litres (so 6 L qualifies; exactly 5 L does not). It is a sample promotion and must be confirmed with the farm. Tap a product photo for its sample price.`;
  if (/price|cost|rate|₹/.test(q)) return `Sample product prices (shown when you tap a product photo): ${products.map(p=>`${p.name} ${currency(p.price)} per ${p.unit}`).join('; ')}. These are sample prices. Please confirm current rates with the farm.`;
  if (/order|buy|purchase|delivery|shipping|pay|checkout/.test(q)) return 'Choose products under “The Good Stuff”, add them to your cart, and use checkout or WhatsApp to confirm availability, delivery and final pricing. Online payment depends on gateway setup.';
  if (/report|test|quality|certif|lab/.test(q)) return 'Please request dated, product-specific test reports and certifications directly from the farm. None are verified on this website.';
  if (/ghee/.test(q)) return 'Fresh Ghee is featured in our homepage keywords. Please ask the farm about today’s availability, ingredients and price.';
  if (/milk|curd|paneer|product|offer|sell/.test(q)) return `Our listed products are ${products.map(p=>p.name).join(', ')}. Ask about each product’s availability and preparation before ordering.`;
  if (/why|different|compare|better/.test(q)) return 'Nanda Dairy Farm emphasizes care, everyday freshness and approachable dairy staples. We do not claim independent superiority over other farms. Compare confirmed ingredients, handling, tests, price and service.';
  if (/contact|phone|whatsapp|hour|location|where/.test(q)) return `The website lists ${farm.displayPhone}, ${farm.location}, and hours ${farm.hours}. Please verify these owner-configurable details before publishing.`;
  return 'I can help with products, sample prices, shopping, quality report enquiries and contacting the farm. For anything else, please contact the farm directly through the Contact section.';
}
async function askFarmAssistant(question) {
  if (aiPending || !question.trim()) return;
  aiPending = true;
  aiForm.querySelector('button').disabled = true;
  appendAIMessage(question, 'user');
  const waiting = appendAIMessage('Thinking…', 'bot');
  aiInput.value = '';
  try {
    const response = await fetch('/api/chat', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:question,history:aiHistory.slice(-6)})});
    if (!response.ok) throw new Error('Assistant service unavailable');
    const data = await response.json();
    waiting.textContent = data.answer || localFarmAnswer(question);
    if (data.mode !== 'ai') waiting.textContent += '\n\n(Site guide response; live AI is not available.)';
  } catch {
    waiting.textContent = localFarmAnswer(question) + '\n\n(Site guide response; live AI is not available.)';
  } finally {
    aiHistory.push({role:'user',content:question},{role:'assistant',content:waiting.textContent});
    if (aiHistory.length > 12) aiHistory.splice(0, aiHistory.length - 12);
    aiPending = false;
    aiForm.querySelector('button').disabled = false;
    aiInput.focus();
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }
}
aiForm.addEventListener('submit', event => {event.preventDefault(); askFarmAssistant(aiInput.value.trim());});
document.querySelectorAll('[data-ask]').forEach(button=>button.addEventListener('click',()=>askFarmAssistant(button.dataset.ask)));
