import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GoodsCard } from './goods-card';


describe('GoodsCard component', () => {
  it('renders title and price', () => {
    render(<GoodsCard title="Мёд гречишный" price={1500} />);
    expect(screen.getByText('Мёд гречишный')).toBeInTheDocument();
    expect(screen.getByText('1500 ₽')).toBeInTheDocument();
  });

  it('calls onToggleFavorite when heart icon is clicked', () => {
    const toggleFavorite = vi.fn();
    render(<GoodsCard isFavorite={false} onToggleFavorite={toggleFavorite} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalled();
  });

  it('calls onAddToCart with the correct quantity', () => {
    const addToCart = vi.fn();
    render(<GoodsCard onAddToCart={addToCart} />);

    const addToCartBtn = screen.getByText('В корзину');
    fireEvent.click(addToCartBtn);

    expect(addToCart).toHaveBeenCalledWith(1); // по умолчанию quantity = 1
  });
});
