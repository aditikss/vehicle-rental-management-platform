import axios from 'axios';

// Create generic Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // FastAPI default relative uri
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // FastAPI OAuth2 uses Bearer format
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor for handling global auth errors (like 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // localStorage.removeItem('token');
      // window.location.href = '/login'; 
      // Handled primarily by AuthContext, but keeping this for safety edge cases
    }
    return Promise.reject(error);
  }
);

export default api;
