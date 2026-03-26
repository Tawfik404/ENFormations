// import api from './api';

// export const moduleService = {
//   getAll: () => api.get('/modules'),
//   getById: (id) => api.get(/modules/${id}),
//   create: (data) => api.post('/modules', data),
//   update: (id, data) => api.put(/modules/${id}, data),
//   delete: (id) => api.delete(/modules/${id})
// };
import api from './api';

export const moduleService = {
  getAll: () => api.get('/modules'),
  create: (data) => api.post('/modules', data),
  delete: (id) => api.delete(`/modules/${id}`)
};
