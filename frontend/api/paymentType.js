import { BASE_URL } from './index.js';

const paymentType = {
  get: async () => {
    return fetch(`${BASE_URL}/paymentTypes`, { method: 'GET' });
  },
  post: async name => {
    return fetch(`${BASE_URL}/paymentTypes`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  delete: async id => {
    return fetch(`${BASE_URL}/paymentTypes/${id}`, { method: 'DELETE' });
  },
};

export default paymentType;
