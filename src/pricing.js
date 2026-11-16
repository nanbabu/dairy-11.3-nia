// One shared pricing function for browser carts and Cloudflare checkout.
// Set this example promotion to your approved rate before going live.
export const VOLUME_DISCOUNT_RATE = 0.05;
export const VOLUME_DISCOUNT_MIN_LITRES = 5;
const milkIds = new Set(['cow', 'buffalo']);
export function calculateOrder(items) {
  let subtotalPaise = 0, milkSubtotalPaise = 0, milkLitres = 0;
  for (const item of items) {
    const quantity = item.quantity;
    const linePaise = Math.round(item.price * 100) * quantity;
    subtotalPaise += linePaise;
    if (milkIds.has(item.id) && item.unit === '1 litre') {
      milkLitres += quantity;
      milkSubtotalPaise += linePaise;
    }
  }
  const discountPaise = milkLitres > VOLUME_DISCOUNT_MIN_LITRES
    ? Math.round(milkSubtotalPaise * VOLUME_DISCOUNT_RATE) : 0;
  return {subtotalPaise, discountPaise, totalPaise: subtotalPaise - discountPaise, milkLitres};
}
