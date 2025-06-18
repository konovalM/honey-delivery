// src/entities/product/__tests__/product-api.test.ts
import { fetchProducts, fetchProductById } from '../api';
import http from '@shared/api/http';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Product } from '../model';

vi.mock('@shared/api/http');
const mockedHttp = vi.mocked(http);

describe('product api', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetchProducts sends GET request with params and returns data', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Гречишный мёд' } as Product,
      { id: 2, name: 'Липовый мёд' } as Product,
    ];
    mockedHttp.get.mockResolvedValueOnce({ data: mockProducts });

    const result = await fetchProducts({ type: 'buckwheat', sort: 'price_desc' });

    expect(mockedHttp.get).toHaveBeenCalledWith('/products', {
      params: { type: 'buckwheat', sort: 'price_desc' },
    });
    expect(result).toEqual(mockProducts);
  });

  it('fetchProductById sends GET request with id and returns single product', async () => {
    const mockProduct: Product = { id: 42, name: 'Майский мёд' } as Product;
    mockedHttp.get.mockResolvedValueOnce({ data: mockProduct });

    const result = await fetchProductById(42);

    expect(mockedHttp.get).toHaveBeenCalledWith('/products/42');
    expect(result).toEqual(mockProduct);
  });
});