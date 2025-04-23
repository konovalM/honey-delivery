import { LOCAL_STORAGE_ACCESS_TOKEN } from '@shared/const/const';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToCart, clearCart, fetchCart, getCartTotal, removeFromCart, updateCartQuantity } from './api';
import { Cart } from './model';

export const useCart = () => {
  return useQuery<Cart, Error>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: !!localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN),
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cartTotal'] });
    },
  });
};

export const useGetCartTotal = () => {
  return useQuery({
    queryKey: ['cartTotal'],
    queryFn: getCartTotal,
  });
};

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cartTotal'] });
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cartTotal'] });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cartTotal'] });
    },
  });
};