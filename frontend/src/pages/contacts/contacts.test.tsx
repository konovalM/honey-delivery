import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contacts } from './contacts';

describe('Contacts Page', () => {
  it('рендерит заголовок и подзаголовок', () => {
    render(<Contacts />);
    expect(screen.getByRole('heading', { level: 1, name: /Свяжитесь с нами/i })).toBeInTheDocument();
    expect(screen.getByText(/Мы всегда на связи/i)).toBeInTheDocument();
  });

  it('отображает группы контактов', () => {
    render(<Contacts />);
    expect(screen.getByText('Социальные сети')).toBeInTheDocument();
    expect(screen.getByText('Мессенджеры')).toBeInTheDocument();
    expect(screen.getByText('Другие контакты')).toBeInTheDocument();
  });

  it('отображает все основные способы связи', () => {
    render(<Contacts />);
    expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
    expect(screen.getByText(/Telegram/i)).toBeInTheDocument();
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument();
    expect(screen.getByText(/SMS\/Звонки/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Телефон/i)).toBeInTheDocument();
  });

  it('отображает график работы и адрес', () => {
    render(<Contacts />);
    expect(screen.getByText(/Суббота - Воскресенье:/i)).toBeInTheDocument();
    expect(screen.getByText(/Краснодар, Цветочный рынок/i)).toBeInTheDocument();
  });
});