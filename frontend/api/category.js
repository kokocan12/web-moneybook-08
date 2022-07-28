import { BASE_URL } from './index.js';

const category = {
  get: async () => {
    return fetch(`${BASE_URL}/categories`, { method: 'GET' });
  },
  getStatistics: async month => {
    return fetch(`${BASE_URL}/categories/${month}/statistics`, { method: 'GET' });
  },
};

export default category;
