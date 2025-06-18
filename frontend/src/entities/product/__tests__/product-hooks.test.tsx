// src/entities/product/__tests__/product-hooks.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts, useProductById } from '../hooks';
import * as api from '../api';
import { Product } from '../model';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../api');
const mockedApi = vi.mocked(api);

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('product hooks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('useProducts fetches products with params', async () => {
    const mockProducts: Product[] = [{ id: 1, name: 'Майский мёд' } as Product];
    mockedApi.fetchProducts.mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useProducts({ type: 'may' }), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockProducts);
    });

    expect(mockedApi.fetchProducts).toHaveBeenCalledWith({ type: 'may' });
  });

  it('useProductById fetches single product by ID', async () => {
    const mockProduct = { id: 42, name: 'Гречишный мёд' } as Product;
    mockedApi.fetchProductById.mockResolvedValueOnce(mockProduct);

    const { result } = renderHook(() => useProductById(42), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockProduct);
    });

    expect(mockedApi.fetchProductById).toHaveBeenCalledWith(42);
  });

  it('useProductById does not call fetchProductById when id is falsy', async () => {
    const { result } = renderHook(() => useProductById(0), { wrapper });

    expect(result.current.data).toBeUndefined();
    expect(mockedApi.fetchProductById).not.toHaveBeenCalled();
  });
});