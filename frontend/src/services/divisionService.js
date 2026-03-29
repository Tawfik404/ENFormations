import api from './api';

export const divisionService = {
  getAll: () => api.get('/division'),
  getById: (id) => api.get(`/division/${id}`),
  create: (data) => api.post('/division', data),
  update: (id, data) => api.put(`/division/${id}`, data),
  delete: (id) => api.delete(`/division/${id}`)
};