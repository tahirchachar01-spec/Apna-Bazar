import { NextRequest, NextResponse } from 'next/server';
import { getOrdersFromDb, saveOrdersToDb } from '@/lib/db';
import { Order } from '@/types/order';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const orders = await getOrdersFromDb();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const orders = await getOrdersFromDb();

    const timestamp = Date.now();
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: body.id || `ord_${timestamp}`,
      orderNumber: body.orderNumber || orderNumber,
      customer: body.customer,
      items: body.items,
      subtotal: body.subtotal,
      deliveryCharges: body.deliveryCharges,
      total: body.total,
      status: body.status || 'Pending',
      createdAt: body.createdAt || new Date().toISOString(),
    };

    orders.unshift(newOrder);

    const saveResult = await saveOrdersToDb(orders);
    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error || 'Failed saving order' }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid order data' },
      { status: 400 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Order ID and status are required' }, { status: 400 });
    }

    const orders = await getOrdersFromDb();
    const orderIndex = orders.findIndex((o) => o.id === id);

    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    orders[orderIndex].status = status;
    const saveResult = await saveOrdersToDb(orders);

    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error || 'Failed updating order' }, { status: 500 });
    }

    return NextResponse.json({ success: true, order: orders[orderIndex] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid request' },
      { status: 400 }
    );
  }
}
