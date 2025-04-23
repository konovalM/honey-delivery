import { LOCAL_STORAGE_ACCESS_TOKEN } from '@shared/const/const';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMe, login, register } from './api';
import { User } from './model';
import { useUserStore } from './store';
import { useEffect } from 'react';

export const useLogin = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: ({ token, user }) => {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, token);
      setUser(user);
    },
  });
};

export const useRegister = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: register,
    onSuccess: ({ token, user }) => {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, token);
      setUser(user);
    },
  });
};

export const useMe = () => {
    const setUser = useUserStore((state) => state.setUser);
  
    const query = useQuery<User, Error>({
      queryKey: ['me'],
      queryFn: getMe,
      retry: false,
      enabled: !!localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN),
    });
  
    useEffect(() => {
      if (query.data) {
        setUser(query.data);
      }
    }, [query.data]);
  
    return query;
  };