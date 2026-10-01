export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Out for Delivery'
  | 'Shipped'
  | 'Delivered'
  | 'Received'
  | 'Cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  deliveryCharges: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
