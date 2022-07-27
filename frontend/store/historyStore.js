import { Store } from './store.js';
import api from '../api/index.js';
import { router } from '../app.js';

export class HistoryStore extends Store {
  constructor() {
    super();
    this.setMetaDate();
    this.getHistory();
    this.state = {
      categories: [],
      paymentTypes: [],
      date: '2022-07',
      inputBar: {
        currentDate: '2022-07-15',
        category: 1,
        categoryName: '쇼핑/뷰티',
        title: '신발',
        paymentType: 2,
        paymentTypeName: '현대카드',
        amount: -20000,
      },
      totalIncome: 0,
      totalExpenditure: 0,
      histories: [],
    };
  }
  async setMetaDate() {
    const [categoriesRes, paymentTypesRes] = await Promise.all([api.category.get(), api.paymentType.get()]);
    const [categories, paymentTypes] = await Promise.all([categoriesRes.json(), paymentTypesRes.json()]);

    /*
    category:
    {
      "id": number,
      "name_en": string,
      "name_ko": string,
      "type": "O"|"I"
    }
    categories:Array<category>
    ----------------------------------
    paymentType:
    {
      "id": number,
      "name": string
    }
    paymentTypes:Array<paymentType>
    */

    this.setState({
      paymentTypes: paymentTypes.payload,
      categories: categories.payload,
    });
    router();
  }

  async getHistory() {
    const res = await api.history.get('202207');
    const data = await res.json();
    const formatted = this.setHistories(data.payload);

    const { totalMonthIncome } = this.setMonthTotal(data.payload);
    const { totalMonthExpenditure } = this.setMonthTotal(data.payload);
    this.setState({ ...this.state, totalMonthIncome, totalMonthExpenditure, histories: formatted });
    router();
  }
  setMonthTotal = historyData => {
    const totalMonthIncome = historyData
      .filter(history => history.amount > 0)
      .reduce((pre, curr) => pre + curr.amount, 0);
    const totalMonthExpenditure = historyData
      .filter(history => history.amount < 0)
      .reduce((pre, curr) => pre + curr.amount, 0);

    return { totalMonthIncome, totalMonthExpenditure };
  };
  setHistories = historyData => {
    const historiesObject = historyData.reduce((pre, curr) => {
      const date = new Date(curr.date).getDate();
      if (!pre[date]) {
        pre[date] = {
          date: curr.date,
          totalIncome: curr.amount > 0 ? curr.amount : 0,
          totalExpenditure: curr.amount < 0 ? curr.amount : 0,
          list: [curr],
        };
      } else {
        pre[date].totalExpenditure += curr.amount < 0 ? curr.amount : 0;
        pre[date].totalIncome += curr.amount > 0 ? curr.amount : 0;
        pre[date].list.push(curr);
      }

      return pre;
    }, {});

    const historiesArray = Object.values(historiesObject);

    return historiesArray;
  };
}
