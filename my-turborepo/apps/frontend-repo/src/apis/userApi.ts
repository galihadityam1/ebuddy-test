import axios, { AxiosInstance } from 'axios';
import { UpdateUserData, User, UserResponse } from './user';

// const API_BASE_URL = process.env.NODE_ENV === 'development'
//   ? 'http://localhost:5001/ebuddy-ee654/asia-southeast2/api'
//   : 'https://asia-southeast2-ebuddy-ee654.cloudfunctions.net/api';

const API_BASE_URL = 'http://localhost:9999/api'

const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      
    },
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

const api = createApiInstance();

export const userApi = {
  login: async (email: string): Promise<UserResponse> => {
    try {
      const response = await api.post<UserResponse>('/login', { email });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {

      if (axios.isAxiosError(error)) {
        throw new Error('Login failed');
      }
      throw error;
    }
  },

  fetchUsers: async (): Promise<User[]> => {
    try {
      const response = await api.get<UserResponse>('/fetch-user-data');
      if (!response.status) return [];
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Unauthorized access');
        }
        throw new Error(error.response?.data?.message || 'Failed to fetch users');
      }
      throw error;
    }
  },

  updateUser: async (userId: string, userData: UpdateUserData) => {
    try {
      const response = await api.put<{ data: User }>(
        `/update-user-data/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error('Unauthorized access');
        }
        throw new Error('Update failed');
      }
      throw error;
    }
  },
};