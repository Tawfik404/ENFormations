// import api from './api';

// export const villeService = {
//   getAll: () => api.get('/villes'),
//   getById: (id) => api.get(/villes/${id}),
//   create: (data) => api.post('/villes', data),
//   update: (id, data) => api.put(/villes/${id}, data),
//   delete: (id) => api.delete(/villes/${id})
// };


import api from './api';

export const villeService = {
  getAll: () => api.get('/villes'),
  create: (data) => api.post('/villes', data),
  delete: (id) => api.delete(`/villes/${id}`)
};

