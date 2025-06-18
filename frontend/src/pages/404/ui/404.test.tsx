// src/pages/404/ui/404.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Page404 } from './404';
import { describe, expect, it } from 'vitest';

describe('Page404', () => {
  it('renders link to home page', () => {
    render(
      <MemoryRouter>
        <Page404 />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /вернуться на главную/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});