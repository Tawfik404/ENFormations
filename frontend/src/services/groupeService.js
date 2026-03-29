

import api from './api';

export const groupeService = {
  getAll: () => api.get('/groupe'),

  getById: (id) => api.get(`/groupe/${id}`),

  create: (data) => api.post('/groupe', data),

  update: (id, data) => api.put(`/groupe/${id}`, data),

  delete: (id) => api.delete(`/groupe/${id}`)
};