import axios from 'axios';
import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Generic API methods
export const apiCall = {
  get: async <T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get(url, { params });
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      return {
        success: false,
        error: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
      };
    }
  },

  post: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      return {
        success: false,
        error: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
      };
    }
  },

  put: async <T>(url: string, data?: unknown): Promise<ApiResponse<T>> => {
    try {
      const response = await api.put(url, data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      return {
        success: false,
        error: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
      };
    }
  },

  delete: async <T>(url: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
      return {
        success: false,
        error: axiosError.response?.data?.message || axiosError.message || 'An error occurred',
      };
    }
  },
};

export default api;
