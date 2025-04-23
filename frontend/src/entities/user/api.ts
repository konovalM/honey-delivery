import http from '@shared/api/http';
import { AuthResponse, LoginDto, RegisterDto, User } from './model';

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await http.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  const response = await http.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await http.get<User>('/auth/me');
  return response.data;
};