import api from './api';

export const salleService = {
  getAll: () => api.get('/salle'),
  getById: (id) => api.get(`/salle/${id}`),
  create: (data) => api.post('/salle', data),
  update: (id, data) => api.put(`/salle/${id}`, data),
  delete: (id) => api.delete(`/salle/${id}`)
};