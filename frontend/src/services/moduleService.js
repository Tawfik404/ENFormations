import api from './api';

export const moduleService = {
  getAll: () => api.get('/module'),
  getById: (id) => api.get(`/module/${id}`),
  create: (data) => api.post('/module', data),
  update: (id, data) => api.put(`/module/${id}`, data),
  delete: (id) => api.delete(`/module/${id}`)
};
