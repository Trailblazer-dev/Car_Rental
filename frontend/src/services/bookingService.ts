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
    const response = await api.post<Booking>('/api/bookings/', bookingData);
    return response.data;
  },

  getUserBookings: async () => {
    const response = await api.get<Booking[]>('/api/bookings/');
    return response.data;
  },

  getBookingById: async (id: number) => {
    const response = await api.get<Booking>(`/api/bookings/${id}/`);
    return response.data;
  },

  cancelBooking: async (id: number) => {
    const response = await api.patch<Booking>(`/api/bookings/${id}/`, {
      status: false
    });
    return response.data;
  }
};

export default bookingService;
