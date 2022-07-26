import { BASE_URL } from '.';

const history = {
  get: async date => {
    return fetch(`${BASE_URL}/moneybook/${date}`, { method: 'GET' });
  },
  post: async () => {},
};

export default history;
