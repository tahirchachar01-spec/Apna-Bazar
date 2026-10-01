import productsData from '@/data/products.json';
import { Product } from '@/types/product';
import { getProductsFromDb } from '@/lib/db';

export async function getProducts(): Promise<Product[]> {
  try {
    return await getProductsFromDb();
  } catch (e) {
    return (productsData as unknown) as Product[];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isFeatured && p.isActive).slice(0, limit);
}

export async function getTrendingProducts(limit = 8): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isTrending && p.isActive).slice(0, limit);
}

export async function getDeals(limit = 8): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.isDeal && p.isActive).slice(0, limit);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(
    (p) => p.categorySlug.toLowerCase() === categorySlug.toLowerCase() && p.isActive
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
  );
}

export async function getRelatedProducts(currentProductId: string, limit = 4): Promise<Product[]> {
  const products = await getProducts();
  const current = products.find((p) => p.id === currentProductId);
  if (!current) return products.slice(0, limit);

  return products
    .filter((p) => p.id !== currentProductId && p.categorySlug === current.categorySlug)
    .slice(0, limit);
}
