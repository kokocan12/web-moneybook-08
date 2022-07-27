import { Store } from './store.js';
import api from '../api/index.js';
import { router } from '../app.js';
import { getCurrentMonth } from '../utils/date.js';

export class HistoryStore extends Store {
  constructor() {
    super();

    this.state = {
      checkboxContents: {
        incomeChecked: true,
        expenditureChecked: true,
        totalIncome: 0,
        totalExpenditure: 0,
      },
      categories: [],
      paymentTypes: [],
      date: getCurrentMonth(),
      inputBar: {
        id: null,
        currentDate: '',
        category: null,
        categoryName: '',
        title: '',
        paymentType: null,
        paymentTypeName: '',
        amount: null,
      },
      totalIncome: 0,
      totalExpenditure: 0,
      histories: [],
    };

    this.setMetaDate();
    this.getHistory();
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

  getHistory = async () => {
    const res = await api.history.get(this.state.date.replace('-', ''));
    const data = await res.json();
    const formatted = this.setHistories(data.payload);

    const { totalMonthIncome } = this.setMonthTotal(data.payload);
    const { totalMonthExpenditure } = this.setMonthTotal(data.payload);
    this.setState({ ...this.state, totalMonthIncome, totalMonthExpenditure, histories: formatted });
    router();
  };
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
