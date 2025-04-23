import http from '@shared/api/http';
import { Product } from './model';

interface ProductQueryParams {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc';
}

export const fetchProducts = async (params?: ProductQueryParams): Promise<Product[]> => {
  const { data } = await http.get<Product[]>('/products', { params });
  return data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await http.get<Product>(`/products/${id}`);
  return data;
};