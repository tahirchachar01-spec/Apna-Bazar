import ordersData from '@/data/orders.json';
import { Order, OrderStatus } from '@/types/order';
import { getOrdersFromDb } from '@/lib/db';

export async function getOrders(): Promise<Order[]> {
  try {
    return await getOrdersFromDb();
  } catch (e) {
    return ordersData as Order[];
  }
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const orders = await getOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id);
}

export async function getRecentOrders(limit = 5): Promise<Order[]> {
  const orders = await getOrders();
  return orders.slice(0, limit);
}

export async function getOrderStats() {
  const orders = await getOrders();
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  
  const statusCounts: Record<OrderStatus, number> = {
    Pending: 0,
    Processing: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
  };

  orders.forEach((o) => {
    if (statusCounts[o.status] !== undefined) {
      statusCounts[o.status]++;
    }
  });

  return {
    totalSales,
    totalOrders,
    statusCounts,
  };
}
