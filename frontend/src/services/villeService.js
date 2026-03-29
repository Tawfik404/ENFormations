import api from './api';

export const villeService = {
  getAll: () => api.get('/ville'),
  getById: (id) => api.get(`/ville/${id}`),
  create: (data) => api.post('/ville', data),
  update: (id, data) => api.put(`/ville/${id}`, data),
  delete: (id) => api.delete(`/ville/${id}`)
};

