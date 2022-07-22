import { Store } from './store.js';

export class HistoryStore extends Store {
  constructor() {
    super();

    this.state = {
      list: [
        { category: 'shopping', title: '영화보기', paidType: '현대카드', amount: -10000 },
        { category: 'health', title: '영화보기', paidType: '현대카드', amount: -10000 },
        { category: 'culture', title: '도서 구매', paidType: '현대카드', amount: -10000 },
        { category: 'allowance', title: '영화보기', paidType: '현대카드', amount: -10000 },
        { category: 'undefined', title: '영화보기', paidType: '현대카드', amount: -10000 },
      ],
    };
  }
}
