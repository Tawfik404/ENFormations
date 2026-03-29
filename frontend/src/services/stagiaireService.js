import api from './api';
 
export const stagiaireService = {
  getAll:  ()           => api.get('/apprenant'),
  getById: (id)         => api.get(`/apprenant/${id}`),
  search:  (q)          => api.get(`/apprenant/search?q=${q}`),
  create:  (data)       => api.post('/apprenant', data),
  update:  (id, data)   => api.put(`/apprenant/${id}`, data),
  delete:  (id)         => api.delete(`/apprenant/${id}`),
};