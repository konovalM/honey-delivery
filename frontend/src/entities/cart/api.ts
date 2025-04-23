import http from '@shared/api/http';
import { Cart, CartItem } from './model';

export const fetchCart = async (): Promise<Cart> => {
    const { data } = await http.get<Cart>('/cart');
    return data;
};

export const getCartTotal = async (): Promise<number> => {
    const { data } = await http.get<number>('/cart/total');
    return data;
};

export const addToCart = async ({
    productId,
    quantity,
}: {
    productId: number;
    quantity?: number;
}): Promise<CartItem> => {
    const { data } = await http.post('/cart', { productId, quantity });
    return data;
};

export const updateCartQuantity = async ({
    productId,
    quantity,
}: {
    productId: number;
    quantity: number;
}): Promise<void> => {
    await http.patch(`/cart/${productId}`, { quantity });
};

export const removeFromCart = async (productId: number): Promise<void> => {
    await http.delete(`/cart/${productId}`);
};

export const clearCart = async (): Promise<void> => {
    await http.delete('/cart');
};
