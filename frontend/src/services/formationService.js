import api from './api';
 
export const formationService = {
  getAll: () => api.get('/formation'),
  getById: (id) => api.get(`/formation/${id}`),
  create: (data) => api.post('/formation', data),
  update: (id, data) => api.put(`/formation/${id}`, data),
  delete: (id) => api.delete(`/formation/${id}`)
};