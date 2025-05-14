import api from './api';

export interface Booking {
  id: number;
  car: number;
  renter: number;
  start_date: string;
  end_date: string;
  total_cost: number;
  booking_date: string;
  status: boolean;
}

export interface BookingRequest {
  car: number;
  start_date: string;
  end_date: string;
}

const bookingService = {
  createBooking: async (bookingData: BookingRequest) => {
    try {
      const response = await api.post<Booking>('/api/bookings/', bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserBookings: async () => {
    try {
      const response = await api.get<Booking[]>('/api/bookings/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getBookingById: async (id: number) => {
    try {
      const response = await api.get<Booking>(`/api/bookings/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  cancelBooking: async (id: number) => {
    try {
      const response = await api.patch<Booking>(`/api/bookings/${id}/`, {
        status: false
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default bookingService;
