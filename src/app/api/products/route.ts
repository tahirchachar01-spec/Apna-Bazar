import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getProductsFromDb, saveProductsToDb } from '@/lib/db';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await getProductsFromDb();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const products = await getProductsFromDb();

    // Generate unique ID & slug if missing
    const newProduct: Product = {
      ...body,
      id: body.id || `prod_${Date.now()}`,
      slug:
        body.slug ||
        (body.name || 'product')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      createdAt: body.createdAt || new Date().toISOString(),
    };

    // Check if duplicate SKU exists
    const existingIndex = products.findIndex((p) => p.id === newProduct.id);
    if (existingIndex >= 0) {
      products[existingIndex] = newProduct;
    } else {
      products.unshift(newProduct);
    }

    const saveResult = await saveProductsToDb(products);
    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error || 'Failed saving product' }, { status: 500 });
    }

    try {
      revalidatePath('/');
      revalidatePath('/shop');
      revalidatePath('/deals');
      revalidatePath(`/category/${newProduct.categorySlug}`);
      revalidatePath(`/product/${newProduct.slug}`);
    } catch {
      // safe fallback
    }

    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid request payload' },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedProduct = (await req.json()) as Product;
    if (!updatedProduct.id) {
      return NextResponse.json({ error: 'Product ID is required for updating' }, { status: 400 });
    }

    const products = await getProductsFromDb();
    const index = products.findIndex((p) => p.id === updatedProduct.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products[index] = { ...products[index], ...updatedProduct };
    const saveResult = await saveProductsToDb(products);

    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error || 'Failed updating product' }, { status: 500 });
    }

    try {
      revalidatePath('/');
      revalidatePath('/shop');
      revalidatePath('/deals');
      revalidatePath(`/category/${products[index].categorySlug}`);
      revalidatePath(`/product/${products[index].slug}`);
    } catch {
      // safe fallback
    }

    return NextResponse.json({ success: true, product: products[index] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid request payload' },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    const products = await getProductsFromDb();
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const saveResult = await saveProductsToDb(filtered);
    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error || 'Failed deleting product' }, { status: 500 });
    }

    try {
      revalidatePath('/');
      revalidatePath('/shop');
      revalidatePath('/deals');
    } catch {
      // safe fallback
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed deleting product' },
      { status: 500 }
    );
  }
}
