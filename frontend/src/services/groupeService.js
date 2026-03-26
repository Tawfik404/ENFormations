

import api from './api';

export const groupeService = {
  getAll: () => api.get('/groupes'),

  getById: (id) => api.get(`/groupes/${id}`),

  create: (data) => api.post('/groupes', data),

  update: (id, data) => api.put(`/groupes/${id}`, data),

  delete: (id) => api.delete(`/groupes/${id}`)
};