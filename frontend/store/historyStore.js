import { Store } from './store.js';

export class HistoryStore extends Store {
  constructor({ categories, paymentMethods }) {
    super();

    this.state = {
      date: '2022-07',
      inputBar: {
        categories,
        paymentMethods,
        currentDate: '',
      },
      totalIncome: 4560000,
      totalExpenditure: 2734000,
      histories: [
        {
          date: '2022-07-15',
          totalIncome: null,
          totalExpenditure: 9500,
          list: [
            {
              id: '24',
              category: 'culture',
              type: 'spend',
              title: '오',
              payment_type: '현대카드',
              amount: 10900,
            },
            {
              id: '25',
              category: 'salary',
              type: 'income',
              title: '월급 넘 적다',
              payment_type: '현대카드',
              amount: 1820000,
            },
          ],
        },
        {
          date: '2022-07-14',
          totalIncome: 130000,
          totalExpenditure: 9500,
          list: [
            {
              id: '24',
              category: 'traffic',
              type: 'spend',
              title: '스트리밍서비스 정기 결제',
              payment_type: '현대카드',
              amount: 10900,
            },
            {
              id: '25',
              category: 'allowance',
              type: 'income',
              title: '스트리밍서비스 정기 결제',
              payment_type: '현대카드',
              amount: 1820000,
            },
          ],
        },
        {
          date: '2022-07-13',
          totalIncome: 130000,
          totalExpenditure: 9500,
          list: [
            {
              id: '24',
              category: 'shopping',
              type: 'spend',
              title: '스트리밍서비스 정기 결제',
              payment_type: '현대카드',
              amount: 10900,
            },
            {
              id: '25',
              category: 'food',
              type: 'income',
              title: '스트리밍서비스 정기 결제',
              payment_type: '현대카드',
              amount: 1820000,
            },
          ],
        },
      ],
      // list: [
      //   { category: 'shopping', title: '영화보기', paidType: '현대카드', amount: -10000 },
      //   { category: 'health', title: '영화보기', paidType: '현대카드', amount: -10000 },
      //   { category: 'culture', title: '도서 구매', paidType: '현대카드', amount: -10000 },
      //   { category: 'allowance', title: '영화보기', paidType: '현대카드', amount: -10000 },
      //   { category: 'undefined', title: '영화보기', paidType: '현대카드', amount: -10000 },
      // ],
    };
  }
}
