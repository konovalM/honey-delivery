import { describe, expect, it, vi } from 'vitest';
import * as api from '../api';
import http from '@shared/api/http';

vi.mock('@shared/api/http');

describe('cart/api', () => {
  it('fetchCart делает GET запрос на /cart', async () => {
    (http.get as any).mockResolvedValueOnce({ data: { items: [], total: 0 } });
    const res = await api.fetchCart();
    expect(res).toEqual({ items: [], total: 0 });
    expect(http.get).toHaveBeenCalledWith('/cart');
  });

  it('getCartTotal делает GET запрос на /cart/total', async () => {
    (http.get as any).mockResolvedValueOnce({ data: 123 });
    const res = await api.getCartTotal();
    expect(res).toBe(123);
    expect(http.get).toHaveBeenCalledWith('/cart/total');
  });

  it('addToCart делает POST запрос на /cart', async () => {
    (http.post as any).mockResolvedValueOnce({ data: { id: 1 } });
    const res = await api.addToCart({ productId: 1, quantity: 2 });
    expect(res).toEqual({ id: 1 });
    expect(http.post).toHaveBeenCalledWith('/cart', { productId: 1, quantity: 2 });
  });

  it('updateCartQuantity делает PATCH запрос на /cart/:id', async () => {
    (http.patch as any).mockResolvedValueOnce(undefined);
    await api.updateCartQuantity({ productId: 1, quantity: 5 });
    expect(http.patch).toHaveBeenCalledWith('/cart/1', { quantity: 5 });
  });

  it('removeFromCart делает DELETE запрос на /cart/:id', async () => {
    (http.delete as any).mockResolvedValueOnce(undefined);
    await api.removeFromCart(1);
    expect(http.delete).toHaveBeenCalledWith('/cart/1');
  });

  it('clearCart делает DELETE запрос на /cart', async () => {
    (http.delete as any).mockResolvedValueOnce(undefined);
    await api.clearCart();
    expect(http.delete).toHaveBeenCalledWith('/cart');
  });
});