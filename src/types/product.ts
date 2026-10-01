export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  images: string[];
  isFeatured: boolean;
  isDeal: boolean;
  isTrending: boolean;
  isActive: boolean;
  specifications?: ProductSpecification[];
  createdAt: string;
}
