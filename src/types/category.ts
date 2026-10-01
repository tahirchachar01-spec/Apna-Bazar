export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  isActive: boolean;
  displayOrder: number;
  productCount?: number;
}
