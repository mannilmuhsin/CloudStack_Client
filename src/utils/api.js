import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export default {
  register: (email, password) => api.post('/auth/register', { email, password }),
  login: (email, password) => api.post('/auth/login', { email, password }),
  verifyEmail: (token) => api.get(`/auth/verify/${token}`),
  getSearchHistory: () => api.get('/search-history'),
  addSearchHistory: (searchTerm, latitude, longitude) => api.post('/search-history', { searchTerm, latitude, longitude }),
  deleteSearchHistory: (id) => api.delete(`/search-history/${id}`),
 
};

