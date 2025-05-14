import api from './api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
}

const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<AuthResponse>('/api/token/', credentials);
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    try {
      // Use the correct registration endpoint
      const response = await api.post('/api/register/', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;
