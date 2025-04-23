import { Product } from '@entities/product/model';

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
  // в ответе
  name?: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}