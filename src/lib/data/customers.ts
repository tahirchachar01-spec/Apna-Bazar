import defaultCustomers from '@/data/customers.json';
import { Customer } from '@/types/customer';
import { getCustomersFromDb } from '@/lib/db';

export async function getCustomers(): Promise<Customer[]> {
  try {
    return await getCustomersFromDb();
  } catch {
    return defaultCustomers as Customer[];
  }
}

export async function getCustomerStats() {
  const customers = await getCustomers();
  return {
    totalCustomers: customers.length,
    activeCustomers: customers.filter((c) => c.totalOrders > 0).length,
  };
}
