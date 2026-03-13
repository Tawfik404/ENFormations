import api from './api';
 
export const stagiaireService = {
  getAll:  ()           => api.get('/stagiaires'),
  getById: (id)         => api.get(`/stagiaires/${id}`),
  search:  (q)          => api.get(`/stagiaires/search?q=${q}`),
  create:  (data)       => api.post('/stagiaires', data),
  update:  (id, data)   => api.put(`/stagiaires/${id}`, data),
  delete:  (id)         => api.delete(`/stagiaires/${id}`),
};