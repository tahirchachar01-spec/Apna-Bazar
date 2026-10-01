import defaultCategories from '@/data/categories.json';
import { Category } from '@/types/category';
import { getCategoriesFromDb } from '@/lib/db';

export async function getCategories(): Promise<Category[]> {
  try {
    const list = await getCategoriesFromDb();
    return list
      .filter((c) => c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  } catch {
    return (defaultCategories as unknown as Category[])
      .filter((c) => c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }
}

export async function getAllCategoriesAdmin(): Promise<Category[]> {
  try {
    const list = await getCategoriesFromDb();
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  } catch {
    return (defaultCategories as unknown as Category[]).sort(
      (a, b) => a.displayOrder - b.displayOrder
    );
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
}
