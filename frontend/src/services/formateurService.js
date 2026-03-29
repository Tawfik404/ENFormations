import api from './api';

export const formateurService = {
  getAll: () => api.get('/formateur'),
  getById: (id) => api.get(`/formateur/${id}`),
  create: (data) => api.post('/formateur', data),
  update: (id, data) => api.put(`/formateur/${id}`, data),
  delete: (id) => api.delete(`/formateur/${id}`),
};