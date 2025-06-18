import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Мокаем ленивые страницы
vi.mock('@pages/main', () => ({ default: () => <div>Main Page</div> }));
vi.mock('@pages/favorites', () => ({ default: () => <div>Favorites Page</div> }));
vi.mock('@pages/catalog', () => ({ default: () => <div>Catalog Page</div> }));
vi.mock('@pages/about', () => ({ default: () => <div>About Page</div> }));
vi.mock('@pages/payment', () => ({ default: () => <div>Payment Page</div> }));
vi.mock('@pages/delivery', () => ({ default: () => <div>Delivery Page</div> }));
vi.mock('@pages/contacts', () => ({ default: () => <div>Contacts Page</div> }));
vi.mock('@pages/cart', () => ({ default: () => <div>Cart Page</div> }));
vi.mock('@pages/404', () => ({ default: () => <div>404 Page</div> }));

describe('App', () => {
  it('renders without crashing and matches initial route', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    // Проверяем, что хоть что-то отрендерилось (например, Main Page)
    expect(await screen.findByText('Main Page')).toBeInTheDocument();
  });
});