import history from './history.js';
import category from './category.js';
import paymentType from './paymentType.js';

export const BASE_URL = process.env.BASE_URL || 'http://localhost:4000/api/';

export default api = {
  history,
  category,
  paymentType,
};
