import api from './api';

const vehicleService = {
  // Get all vehicles
  getVehicles: async () => {
    try {
      // Dummy URL - update once backend is connected
      const response = await api.get('/vehicles');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      // Dummy return for development before backend is fully implemented
      return [
        { vehicle_id: 1, brand: 'Tesla', model: 'Model 3', type: 'Sedan', price_per_hour: 15, price_per_day: 120, availability: true },
        { vehicle_id: 2, brand: 'BMW', model: 'X5', type: 'SUV', price_per_hour: 25, price_per_day: 200, availability: true },
        { vehicle_id: 3, brand: 'Ford', model: 'Mustang', type: 'Sports', price_per_hour: 30, price_per_day: 250, availability: false },
        { vehicle_id: 4, brand: 'Honda', model: 'Civic', type: 'Sedan', price_per_hour: 10, price_per_day: 80, availability: true },
        { vehicle_id: 5, brand: 'Toyota', model: 'RAV4', type: 'SUV', price_per_hour: 18, price_per_day: 140, availability: true }
      ];
    }
  },

  // Get specific vehicle by ID
  getVehicleById: async (id) => {
    try {
      const response = await api.get(`/vehicles/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vehicle ${id}:`, error);
      // Dummy data fallback
      return { vehicle_id: id, brand: 'Sample Brand', model: 'Sample Model', type: 'Sedan', price_per_hour: 15, price_per_day: 120, availability: true };
    }
  },

  // Manager/Admin Add vehicle
  addVehicle: async (vehicleData) => {
    try {
      const response = await api.post('/vehicles', vehicleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Manager/Admin Update vehicle (e.g. availability)
  updateVehicle: async (id, vehicleData) => {
    try {
      const response = await api.put(`/vehicles/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default vehicleService;
