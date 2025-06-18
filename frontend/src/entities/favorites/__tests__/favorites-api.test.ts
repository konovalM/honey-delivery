// src/entities/favorites/__tests__/favorites-api.test.ts
import {
    fetchFavorites,
    addFavorite,
    removeFavorite,
    clearFavorites,
  } from '../api';
  import http from '@shared/api/http';
  import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
  import type { Favorite } from '../model';
  
  vi.mock('@shared/api/http');
  const mockedHttp = vi.mocked(http);
  
  describe('favorites API', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    it('fetchFavorites calls GET /favorites and returns data', async () => {
      const mockData: Favorite[] = [{ id: 1, productId: 123 }];
      mockedHttp.get.mockResolvedValueOnce({ data: mockData });
  
      const result = await fetchFavorites();
  
      expect(mockedHttp.get).toHaveBeenCalledWith('/favorites');
      expect(result).toEqual(mockData);
    });
  
    it('addFavorite calls POST /favorites with productId', async () => {
      mockedHttp.post.mockResolvedValueOnce({});
  
      await addFavorite(42);
  
      expect(mockedHttp.post).toHaveBeenCalledWith('/favorites', { productId: 42 });
    });
  
    it('removeFavorite calls DELETE /favorites/:id', async () => {
      mockedHttp.delete.mockResolvedValueOnce({});
  
      await removeFavorite(99);
  
      expect(mockedHttp.delete).toHaveBeenCalledWith('/favorites/99');
    });
  
    it('clearFavorites calls DELETE /favorites', async () => {
      mockedHttp.delete.mockResolvedValueOnce({});
  
      await clearFavorites();
  
      expect(mockedHttp.delete).toHaveBeenCalledWith('/favorites');
    });
  });