import api from './api';
import { AuthResponse, LoginDto, RegisterDto, User } from '../types/auth.types';

export const authService = {  // ← Make sure 'export' is here
  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  async getMe(): Promise<{ message: string; user: User }> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};