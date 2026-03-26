import api from './api';

export const divisionService = {
  getAll: () => api.get('/divisions'),
  getById: (id) => api.get(`/divisions/${id}`),
  create: (data) => api.post('/divisions', data),
  update: (id, data) => api.put(`/divisions/${id}`, data),
  delete: (id) => api.delete(`/divisions/${id}`)
};