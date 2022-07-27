import { BASE_URL } from './index.js';

const history = {
  get: async date => {
    return fetch(`${BASE_URL}/moneybook/${date}`, { method: 'GET' }).then(res => res);
  },
  /**
   *
   * @param {{date:string;category:number;title:string;paymentType:number;amount:number;}} data
   */
  post: async ({ date, category, title, paymentType, amount }) => {
    return fetch(`${BASE_URL}/moneybook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, category, title, paymentType, amount }),
    });
  },
};

export default history;
