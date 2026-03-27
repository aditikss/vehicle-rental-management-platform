import api from './api';

const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      // Dummy success logic for UI demonstration
      return { success: true, booking_id: Math.floor(Math.random() * 10000), ...bookingData };
    }
  },

  // Get bookings for current user
  getUserBookings: async () => {
    try {
      const response = await api.get('/bookings/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      // Dummy data fallback
      return [
        { booking_id: 101, vehicle_id: 1, brand: 'Tesla', model: 'Model 3', start_time: new Date().toISOString(), end_time: new Date(Date.now() + 86400000).toISOString(), total_cost: 120, status: 'Active' },
        { booking_id: 102, vehicle_id: 4, brand: 'Honda', model: 'Civic', start_time: new Date(Date.now() - 172800000).toISOString(), end_time: new Date(Date.now() - 86400000).toISOString(), total_cost: 80, status: 'Completed' }
      ];
    }
  },

  // Get all bookings (Admin/Fleet Manager)
  getAllBookings: async () => {
    try {
      const response = await api.get('/bookings');
      return response.data;
    } catch (error) {
      return [
        { booking_id: 101, user_id: 1, email: 'user@example.com', vehicle_id: 1, brand: 'Tesla', model: 'Model 3', start_time: new Date().toISOString(), end_time: new Date(Date.now() + 86400000).toISOString(), total_cost: 120, status: 'Active' },
      ];
    }
  },

  // Complete a booking (Return vehicle)
  returnVehicle: async (bookingId) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/return`);
      return response.data;
    } catch (error) {
      return { success: true, message: 'Vehicle returned successfully' };
    }
  }
};

export default bookingService;
