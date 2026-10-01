import { Order } from '@/types/order';
import { StoreSettings } from '@/types/settings';
import { formatPrice } from '@/lib/utils';

/**
 * Builds the pre-filled WhatsApp message for an order using dynamic settings
 */
export function buildWhatsAppOrderMessage(order: Order, settings: StoreSettings): string {
  const template =
    settings.whatsapp.orderMessageTemplate ||
    'Hello APNA Bazar! I want to confirm my order {orderNumber}:\n\n*Customer Details:*\nName: {customerName}\nPhone: {phoneNumber}\nCity: {city}\nAddress: {address}\n\n*Order Items:*\n{itemsList}\n\nSubtotal: {subtotal}\nDelivery: {deliveryCharges}\n*Grand Total: {total}*\n\nPlease confirm my order. Thank you!';

  const itemsList = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.productName} (Qty: ${item.quantity}) - ${formatPrice(
          item.price * item.quantity
        )}`
    )
    .join('\n');

  return template
    .replace('{orderNumber}', order.orderNumber)
    .replace('{customerName}', order.customer.fullName)
    .replace('{phoneNumber}', order.customer.phoneNumber)
    .replace('{city}', order.customer.city)
    .replace('{address}', order.customer.address)
    .replace('{itemsList}', itemsList)
    .replace('{subtotal}', formatPrice(order.subtotal))
    .replace('{deliveryCharges}', order.deliveryCharges === 0 ? 'FREE' : formatPrice(order.deliveryCharges))
    .replace('{total}', formatPrice(order.total));
}

/**
 * Generates the direct WhatsApp URL redirect
 */
export function generateWhatsAppOrderUrl(order: Order, settings: StoreSettings): string {
  const rawNumber = settings.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
  const message = buildWhatsAppOrderMessage(order, settings);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${rawNumber}?text=${encoded}`;
}

/**
 * Generates direct WhatsApp inquiry URL for a product
 */
export function generateWhatsAppInquiryUrl(productName: string, productUrl: string, settings: StoreSettings): string {
  const rawNumber = settings.whatsapp.phoneNumber.replace(/[^0-9]/g, '');
  const message = `Hello APNA Bazar! I am interested in *${productName}* (${productUrl}). Is it currently available?`;
  return `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
}
