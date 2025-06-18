import { render, screen } from '@testing-library/react';
import { Catalog } from './catalog';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import * as productHooks from '@entities/product/hooks';
import * as favoritesHooks from '@entities/favorites/hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockProducts = [
  { id: 1, title: 'Мёд гречишный', price: 450 },
  { id: 2, title: 'Мёд акациевый', price: 500 },
];

describe('Catalog Page', () => {
  beforeEach(() => {
    vi.spyOn(productHooks, 'useProducts').mockReturnValue({ data: mockProducts });
    vi.spyOn(favoritesHooks, 'useFavorites').mockReturnValue({ data: [] });
    vi.spyOn(favoritesHooks, 'useAddFavorite').mockReturnValue({ mutate: vi.fn() });
    vi.spyOn(favoritesHooks, 'useRemoveFavorite').mockReturnValue({ mutate: vi.fn() });
  });

  it('рендерит каталог с товарами', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Catalog />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Каталог продуктов/i)).toBeInTheDocument();
    expect(screen.getByText(/Мёд гречишный/)).toBeInTheDocument();
    expect(screen.getByText(/Мёд акациевый/)).toBeInTheDocument();
  });

  it('рендерит сообщение если товаров нет', () => {
    vi.spyOn(productHooks, 'useProducts').mockReturnValue({ data: [] });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Catalog />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Нет товаров/i)).toBeInTheDocument();
  });
});