import { render, screen } from '@testing-library/react';
import { MainPage } from './main-page';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import * as productHooks from '@entities/product/hooks';
import * as favoritesHooks from '@entities/favorites/hooks';
import * as cartHooks from '@entities/cart/hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { notification } from 'antd';

vi.mock('antd', async (importOriginal) => {
  const antd = await importOriginal();
  return {
    ...antd,
    notification: {
      useNotification: () => [vi.fn(), <div key="context-holder">contextHolder</div>],
    },
  };
});

describe('MainPage', () => {
  const mockProducts = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    title: `Продукт ${i + 1}`,
    description: `Описание ${i + 1}`,
    price: 100 + i * 10,
  }));

  beforeEach(() => {
    vi.spyOn(productHooks, 'useProducts').mockReturnValue({ data: mockProducts });
    vi.spyOn(favoritesHooks, 'useFavorites').mockReturnValue({ data: [{ id: 2 }, { id: 4 }] });
    vi.spyOn(favoritesHooks, 'useAddFavorite').mockReturnValue({ mutate: vi.fn() });
    vi.spyOn(favoritesHooks, 'useRemoveFavorite').mockReturnValue({ mutate: vi.fn() });
    vi.spyOn(cartHooks, 'useAddToCart').mockReturnValue({ mutate: vi.fn() });
  });

  it('рендерит блоки товаров и заголовки', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MainPage />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Доставка МЕДА в СПБ и Краснодаре/i)).toBeInTheDocument();
    expect(screen.getByText(/Сезонное предложение/i)).toBeInTheDocument();
    expect(screen.getByText(/Хит продаж/i)).toBeInTheDocument();
    expect(screen.getByText(/Со скидкой/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();

    // Проверим наличие 9 продуктов
    for (let i = 1; i <= 9; i++) {
      expect(screen.getByText(`Продукт ${i}`)).toBeInTheDocument();
    }
  });
});