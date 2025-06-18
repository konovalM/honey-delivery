// src/pages/cart/cart.test.tsx
import { render, screen } from '@testing-library/react';
import { Cart } from './cart';
import { describe, it, vi, expect, beforeAll } from 'vitest';
import * as hooks from '@entities/cart/hooks';

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

// Мокаем все хуки cart
vi.mock('@entities/cart/hooks', async () => {
  const actual = await vi.importActual<typeof hooks>('@entities/cart/hooks');
  return {
    ...actual,
    useCart: () => ({ data: { items: [] } }),
    useRemoveFromCart: () => ({ mutateAsync: vi.fn() }),
    useClearCart: () => ({ mutateAsync: vi.fn() }),
    useUpdateCartQuantity: () => ({ mutateAsync: vi.fn() }),
  };
});

describe('Cart page', () => {
  it('renders empty cart message', () => {
    render(<Cart />);
    expect(screen.getByText('Корзина')).toBeInTheDocument();
    expect(screen.getByText('Корзина пуста')).toBeInTheDocument();
    expect(
        screen.getByRole('button', { name: 'Очистить корзину' })
      ).toBeDisabled();
  });
});