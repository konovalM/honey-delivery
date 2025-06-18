import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import * as cartApi from '../api';
import {
  useAddToCart,
  useRemoveFromCart,
  useClearCart,
  useUpdateCartQuantity,
  useGetCartTotal,
  useCart,
} from '../hooks';

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('Cart hooks', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('useAddToCart вызывает addToCart', async () => {
    const mockFn = vi.spyOn(cartApi, 'addToCart').mockResolvedValue({ id: 1 } as any);
    const { result } = renderHook(() => useAddToCart(), { wrapper });

    await result.current.mutateAsync({ productId: 1, quantity: 2 });

    expect(mockFn).toHaveBeenCalledWith({ productId: 1, quantity: 2 });
  });

  it('useRemoveFromCart вызывает removeFromCart', async () => {
    const mockFn = vi.spyOn(cartApi, 'removeFromCart').mockResolvedValue();
    const { result } = renderHook(() => useRemoveFromCart(), { wrapper });

    await result.current.mutateAsync(1);

    expect(mockFn).toHaveBeenCalledWith(1);
  });

  it('useClearCart вызывает clearCart', async () => {
    const mockFn = vi.spyOn(cartApi, 'clearCart').mockResolvedValue();
    const { result } = renderHook(() => useClearCart(), { wrapper });

    await result.current.mutateAsync();

    expect(mockFn).toHaveBeenCalled();
  });

  it('useUpdateCartQuantity вызывает updateCartQuantity', async () => {
    const mockFn = vi.spyOn(cartApi, 'updateCartQuantity').mockResolvedValue();
    const { result } = renderHook(() => useUpdateCartQuantity(), { wrapper });

    await result.current.mutateAsync({ productId: 1, quantity: 3 });

    expect(mockFn).toHaveBeenCalledWith({ productId: 1, quantity: 3 });
  });

  it('useGetCartTotal вызывает getCartTotal', async () => {
    const mockFn = vi.spyOn(cartApi, 'getCartTotal').mockResolvedValue(100);
    const { result } = renderHook(() => useGetCartTotal(), { wrapper });

    await result.current.refetch();

    expect(mockFn).toHaveBeenCalled();
  });

  it('useCart вызывает fetchCart, если есть токен', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');
    const mockFn = vi.spyOn(cartApi, 'fetchCart').mockResolvedValue({ items: [], total: 0 });
    const { result } = renderHook(() => useCart(), { wrapper });

    await result.current.refetch();

    expect(mockFn).toHaveBeenCalled();
  });
});