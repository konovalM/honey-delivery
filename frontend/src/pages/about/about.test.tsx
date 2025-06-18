// src/pages/about/about.test.tsx
import { render, screen } from '@testing-library/react';
import { About } from './about';
import { describe, expect, it } from 'vitest';

describe('About page', () => {
  it('renders title, image and map container', () => {
    render(<About />);

    // Проверка заголовка
    expect(screen.getByRole('heading', { name: /о нашей пасеке/i })).toBeInTheDocument();

    // Проверка изображения
    const image = screen.getByAltText('beefarm');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('image.png'));

    // Проверка контейнера карты
    const mapContainer = document.getElementById('yandex-map-container');
    expect(mapContainer).toBeInTheDocument();
  });
});