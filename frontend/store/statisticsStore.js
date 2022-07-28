import api from '../api/index.js';
import { router } from '../app.js';
import { getCurrentMonth } from '../utils/date.js';
import { HistoryStore } from './historyStore.js';
import { Store } from './store.js';

export class StatisticsStore extends Store {
  constructor() {
    super();
    this.state = {
      date: getCurrentMonth(),
      selectedCategory: 'shopping',
      categoriesMonth: [],
      lastSixMonthExpenditure: [],
    };
    this.getStatistics();
  }
  getStatistics = async () => {
    const date = this.state.date.replace('-', '');
    const res = await api.category.getStatistics(date);
    const data = await res.json();
    const { categoriesMonth } = data.payload;
    const { lastSixMonthExpenditure } = data.payload;
    this.setState({ ...this.state, categoriesMonth, lastSixMonthExpenditure });
    router();
  };

  updateState = args => {
    const histories = [];
    const selectedCategory = this.state.selectedCategory;
    if (selectedCategory) {
      const categoriesMap = args.categories.reduce((acc, curr) => {
        acc[curr.name_en] = curr.id;
        return acc;
      }, {});

      for (let i = 0; i < args.histories.length; i++) {
        const dateHistories = args.histories[i];
        const list = dateHistories.list.filter(item => item.category === categoriesMap[selectedCategory]);
        if (list.length) {
          histories.push({ ...dateHistories, list });
        }
      }
    }

    this.setState({ ...this.state, date: args.date, histories });
    this.getStatistics();
  };
}
