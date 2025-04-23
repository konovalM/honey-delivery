import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFavorites, addFavorite, removeFavorite, clearFavorites } from './api';
import { Favorite } from './model';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '@shared/const/const';

export const useFavorites = () => {
  return useQuery<Favorite[], Error>({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    enabled: !!localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN),
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useClearFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};
