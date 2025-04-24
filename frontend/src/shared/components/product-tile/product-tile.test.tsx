import { render, screen, fireEvent } from '@testing-library/react';
import { ProductTile } from './product-tile';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';

describe('ProductTile component', () => {
  const mockCartItem = {
    id: 1,
    quantity: 2,
    product: {
      id: 1,
      title: 'Мёд гречишный',
      description: 'Ароматный и насыщенный мёд',
      price: 500,
    }
  };

  const onQuantityChange = vi.fn();
  const onToggleSelect = vi.fn();
  const onRemove = vi.fn();

  it('renders product details correctly', () => {
    render(
      <ProductTile
        cartItem={mockCartItem}
        onQuantityChange={onQuantityChange}
        onToggleSelect={onToggleSelect}
        onRemove={onRemove}
        selected={true}
      />
    );

    expect(screen.getByText(/Мёд гречишный/i)).toBeInTheDocument();
    expect(screen.getByText(/Ароматный и насыщенный мёд/i)).toBeInTheDocument();
    expect(screen.getByText(/500 ₽/)).toBeInTheDocument();
  });

  it('calls onToggleSelect when checkbox is clicked', () => {
    render(
      <ProductTile
        cartItem={mockCartItem}
        onQuantityChange={onQuantityChange}
        onToggleSelect={onToggleSelect}
        onRemove={onRemove}
        selected={false}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onToggleSelect).toHaveBeenCalledWith(mockCartItem.id, true);
  });

  it('calls onRemove when delete button is clicked', () => {
    render(
      <ProductTile
        cartItem={mockCartItem}
        onQuantityChange={onQuantityChange}
        onToggleSelect={onToggleSelect}
        onRemove={onRemove}
        selected={false}
      />
    );

    const removeButton = screen.getByTestId('delete-button');
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledWith(mockCartItem.product.id);
  });
});