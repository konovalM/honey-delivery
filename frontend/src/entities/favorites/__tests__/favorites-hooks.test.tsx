// src/entities/favorites/__tests__/favorites-hooks.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import {
  useFavorites,
  useAddFavorite,
  useRemoveFavorite,
  useClearFavorites,
} from '../hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '../api';
import { act } from 'react-dom/test-utils';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';

vi.mock('../api');
const mockedApi = vi.mocked(api);

describe('favorites hooks', () => {
  const createWrapper = () => {
    const queryClient = new QueryClient();
    return {
      queryClient,
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    };
  };

  beforeEach(() => {
    localStorage.setItem('access_token', 'mock-token'); // your LOCAL_STORAGE_ACCESS_TOKEN
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches favorites via useFavorites', async () => {
    mockedApi.fetchFavorites.mockResolvedValue([{ id: 1, productId: 10 }]);

    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useFavorites(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual([{ id: 1, productId: 10 }]);
    });
  });

  it('adds favorite via useAddFavorite', async () => {
    mockedApi.addFavorite.mockResolvedValue();

    const { queryClient, wrapper } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useAddFavorite(), { wrapper });

    await act(() => result.current.mutateAsync(42));

    expect(mockedApi.addFavorite).toHaveBeenCalledWith(42);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['favorites'] });
  });

  it('removes favorite via useRemoveFavorite', async () => {
    mockedApi.removeFavorite.mockResolvedValue();

    const { queryClient, wrapper } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useRemoveFavorite(), { wrapper });

    await act(() => result.current.mutateAsync(42));

    expect(mockedApi.removeFavorite).toHaveBeenCalledWith(42);
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['favorites'] });
  });

  it('clears favorites via useClearFavorites', async () => {
    mockedApi.clearFavorites.mockResolvedValue();

    const { queryClient, wrapper } = createWrapper();
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useClearFavorites(), { wrapper });

    await act(() => result.current.mutateAsync());

    expect(mockedApi.clearFavorites).toHaveBeenCalled();
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['favorites'] });
  });
});