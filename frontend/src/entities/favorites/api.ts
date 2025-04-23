import http from '@shared/api/http';
import { Favorite } from './model';

export const fetchFavorites = async (): Promise<Favorite[]> => {
  const { data } = await http.get<Favorite[]>('/favorites');
  return data;
};

export const addFavorite = async (productId: number): Promise<void> => {
  await http.post('/favorites', { productId });
};

export const removeFavorite = async (productId: number): Promise<void> => {
  await http.delete(`/favorites/${productId}`);
};

export const clearFavorites = async (): Promise<void> => {
  await http.delete('/favorites');
};