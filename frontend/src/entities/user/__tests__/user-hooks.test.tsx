// src/entities/user/__tests__/user-hooks.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useLogin, useRegister, useMe } from '../hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '../api';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('../api');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('user hooks', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should login user successfully', async () => {
    const mockLoginResponse = { accessToken: 'token', user: { id: 1, email: 'test@test.com' } };
    vi.spyOn(api, 'login').mockResolvedValueOnce(mockLoginResponse);

    const { result } = renderHook(() => useLogin(), { wrapper });

    result.current.mutate({ email: 'test@test.com', password: 'password' });

    await waitFor(() => {
      expect(api.login).toHaveBeenCalledWith({ email: 'test@test.com', password: 'password' });
    });
  });

  it('should register user successfully', async () => {
    const mockRegisterResponse = { accessToken: 'token', user: { id: 2, email: 'new@test.com' } };
    vi.spyOn(api, 'register').mockResolvedValueOnce(mockRegisterResponse);

    const { result } = renderHook(() => useRegister(), { wrapper });

    result.current.mutate({ email: 'new@test.com', password: '123456' });

    await waitFor(() => {
      expect(api.register).toHaveBeenCalledWith({ email: 'new@test.com', password: '123456' });
    });
  });

  it('should fetch current user with useMe', async () => {
    const mockUser = { id: 1, email: 'me@test.com' };
    vi.spyOn(api, 'getMe').mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useMe(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockUser);
      expect(api.getMe).toHaveBeenCalled();
    });
  });
});