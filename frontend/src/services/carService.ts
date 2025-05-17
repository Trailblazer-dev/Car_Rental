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
    const response = await api.get<Car[]>('/api/cars/');
    return response.data;
  },

  getCarById: async (id: number) => {
    const response = await api.get<Car>(`/api/cars/${id}/`);
    return response.data;
  },

  searchCars: async (params: Record<string, string>) => {
    const response = await api.get<Car[]>('/api/cars/', { params });
    return response.data;
  }
};

export default carService;
