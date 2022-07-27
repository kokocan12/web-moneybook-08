import { CATEGORY_TYPE } from '../utils/constant.js';
import { Store } from './store.js';

export class StatisticsStore extends Store {
  constructor() {
    super();
    this.state = {
      categoriesMonth: [
        { category: CATEGORY_TYPE.SHOPPING, percent: 0.31, total: 32300 },
        { category: CATEGORY_TYPE.TRAFFIC, percent: 0.19, total: 32300 },
        { category: CATEGORY_TYPE.CULTURE, percent: 0.2, total: 32300 },
        { category: CATEGORY_TYPE.FOOD, percent: 0.1, total: 32300 },
        { category: CATEGORY_TYPE.HEALTH, percent: 0.1, total: 32300 },
        { category: CATEGORY_TYPE.LIFE, percent: 0.08, total: 32300 },
        { category: CATEGORY_TYPE.ETC, percent: 0.02, total: 32300 },
      ],
    };
  }
}
