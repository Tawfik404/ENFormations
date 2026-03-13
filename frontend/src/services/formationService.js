import api from './api';
 
export const formationService = {
  getAll: () => api.get('/formations'),
};