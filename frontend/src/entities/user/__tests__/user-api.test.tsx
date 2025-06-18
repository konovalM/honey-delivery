// src/entities/user/__tests__/user-api.test.ts
import { login, register, getMe } from '../api';
import http from '@shared/api/http';
import { AuthResponse, User } from '../model';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@shared/api/http');

describe('user api', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should call POST /auth/login with correct payload and return data', async () => {
    const mockResponse: AuthResponse = {
      accessToken: 'test-token',
      user: { id: 1, email: 'user@example.com' },
    };
    (http.post as any).mockResolvedValueOnce({ data: mockResponse });

    const result = await login({ email: 'user@example.com', password: '123456' });

    expect(http.post).toHaveBeenCalledWith('/auth/login', {
      email: 'user@example.com',
      password: '123456',
    });
    expect(result).toEqual(mockResponse);
  });

  it('should call POST /auth/register with correct payload and return data', async () => {
    const mockResponse: AuthResponse = {
      accessToken: 'register-token',
      user: { id: 2, email: 'new@example.com' },
    };
    (http.post as any).mockResolvedValueOnce({ data: mockResponse });

    const result = await register({ email: 'new@example.com', password: 'abcdef' });

    expect(http.post).toHaveBeenCalledWith('/auth/register', {
      email: 'new@example.com',
      password: 'abcdef',
    });
    expect(result).toEqual(mockResponse);
  });

  it('should call GET /auth/me and return current user', async () => {
    const mockUser: User = { id: 1, email: 'me@example.com' };
    (http.get as any).mockResolvedValueOnce({ data: mockUser });

    const result = await getMe();

    expect(http.get).toHaveBeenCalledWith('/auth/me');
    expect(result).toEqual(mockUser);
  });
});