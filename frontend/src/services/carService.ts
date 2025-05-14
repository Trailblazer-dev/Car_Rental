import api from './api';

export interface Car {
  id: number;
  car_owner: number;
  car_model: string;
  car_make: string;
  car_year: number;
  price_per_day: number;
  availability: boolean;
  location: string;
  image: string;
}

const carService = {
  getAllCars: async () => {
    try {
      const response = await api.get<Car[]>('/api/cars/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCarById: async (id: number) => {
    try {
      const response = await api.get<Car>(`/api/cars/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchCars: async (params: Record<string, string>) => {
    try {
      const response = await api.get<Car[]>('/api/cars/', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default carService;
