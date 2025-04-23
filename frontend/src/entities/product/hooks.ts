import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from './api';
import { Product } from './model';

export const useProducts = (params?: Record<string, any>) => {
  return useQuery<Product[], Error>({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
};

export const useProductById = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};