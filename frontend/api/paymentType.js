import { BASE_URL } from './index.js';

const paymentType = {
  get: async () => {
    return fetch(`${BASE_URL}/paymentTypes`, { method: 'GET' });
  },
  post: async () => {},
  delete: async () => {},
};

export default paymentType;
