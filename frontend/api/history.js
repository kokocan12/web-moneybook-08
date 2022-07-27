import { BASE_URL } from './index.js';

const history = {
  get: async date => {
    return fetch(`${BASE_URL}/moneybook/${date}`, { method: 'GET' }).then(res => res);
  },
  post: async () => {},
};

export default history;
