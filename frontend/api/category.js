import { BASE_URL } from './index.js';

const category = {
  get: async () => {
    return fetch(`${BASE_URL}/categories`, { method: 'GET' });
  },
};

export default category;
