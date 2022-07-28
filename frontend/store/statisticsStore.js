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
      selectedCategory: '',
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
    this.setState({ ...this.state, date: args.date });
    this.getStatistics();
  };
}
