import { NextRequest, NextResponse } from 'next/server';
import { getCategoriesFromDb, saveCategoriesToDb } from '@/lib/db';
import { Category } from '@/types/category';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await getCategoriesFromDb();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const categories = await getCategoriesFromDb();

    const newCategory: Category = {
      id: body.id || `cat-${Date.now()}`,
      name: body.name,
      slug:
        body.slug ||
        (body.name || 'category')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, ''),
      description: body.description || '',
      image: body.image || '/logo.jpg',
      displayOrder: Number(body.displayOrder) || categories.length + 1,
      isActive: body.isActive !== false,
      productCount: Number(body.productCount) || 0,
    };

    const existingIndex = categories.findIndex((c) => c.id === newCategory.id);
    if (existingIndex >= 0) {
      categories[existingIndex] = newCategory;
    } else {
      categories.push(newCategory);
    }

    const saveResult = await saveCategoriesToDb(categories);
    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.error || 'Failed saving category to database' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Invalid request payload' },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updated = (await req.json()) as Category;
    if (!updated.id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    const categories = await getCategoriesFromDb();
    const index = categories.findIndex((c) => c.id === updated.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    categories[index] = { ...categories[index], ...updated };
    const saveResult = await saveCategoriesToDb(categories);

    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.error || 'Failed updating category' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, category: categories[index] });
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
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    const categories = await getCategoriesFromDb();
    const filtered = categories.filter((c) => c.id !== id);

    if (filtered.length === categories.length) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const saveResult = await saveCategoriesToDb(filtered);
    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.error || 'Failed deleting category' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed deleting category' },
      { status: 500 }
    );
  }
}
