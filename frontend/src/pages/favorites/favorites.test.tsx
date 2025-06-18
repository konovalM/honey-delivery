import { render, screen } from '@testing-library/react';
import { Favorites } from './favorites';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import * as favoritesHooks from '@entities/favorites/hooks';
import * as cartHooks from '@entities/cart/hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('antd', async (importOriginal) => {
  const antd = await importOriginal();
  return {
    ...antd,
    notification: {
      useNotification: () => [vi.fn(), <div key="context-holder">contextHolder</div>],
    },
  };
});

describe('Favorites Page', () => {
  const mockFavorites = [
    { id: 1, title: 'Мёд гречишный', price: 450, description: 'Вкусный и полезный' },
    { id: 2, title: 'Прополис', price: 300, description: 'Натуральный продукт' },
  ];

  beforeEach(() => {
    vi.spyOn(favoritesHooks, 'useFavorites').mockReturnValue({ data: mockFavorites, isLoading: false });
    vi.spyOn(favoritesHooks, 'useRemoveFavorite').mockReturnValue({ mutate: vi.fn() });
    vi.spyOn(cartHooks, 'useAddToCart').mockReturnValue({ mutate: vi.fn() });
  });

  it('рендерит заголовок и товары в избранном', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Favorites />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Избранное/i)).toBeInTheDocument();
    expect(screen.getByText(/Мёд гречишный/i)).toBeInTheDocument();
    expect(screen.getByText(/Прополис/i)).toBeInTheDocument();
  });

  it('рендерит спиннер при isLoading', () => {
    vi.spyOn(favoritesHooks, 'useFavorites').mockReturnValue({ data: [], isLoading: true });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Favorites />
      </QueryClientProvider>
    );

    expect(document.querySelector('.ant-spin')).toBeInTheDocument();
  });

  it('рендерит сообщение если избранное пустое', () => {
    vi.spyOn(favoritesHooks, 'useFavorites').mockReturnValue({ data: [], isLoading: false });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Favorites />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Нет товаров в избранном/i)).toBeInTheDocument();
  });
});