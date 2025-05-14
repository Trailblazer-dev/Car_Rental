import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        localStorage.setItem('token', access);
        
        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh failed, clear tokens and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // Only redirect to login if we're not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Improved helper to get the complete image URL for Django media files
export const getImageUrl = (relativePath: string) => {
  if (!relativePath) {
    return "/src/assets/car-placeholder.jpg";
  }
  
  // If it's already a full URL
  if (relativePath.startsWith('http')) {
    return relativePath;
  }
  
  // If it's a local asset path
  if (relativePath.startsWith('/src/') || relativePath.startsWith('@/')) {
    return relativePath;
  }
  
  // Handle image path from Django - ensure we're using /media/ prefix
  if (relativePath.includes('car_images')) {
    // Extract just the filename if it's a full path
    const fileName = relativePath.split('/').pop();
    return `${API_BASE_URL}/media/car_images/${fileName}`;
  }
  
  // Default case - prepend with API base URL
  return `${API_BASE_URL}/media/${relativePath}`;
};

export default api;
