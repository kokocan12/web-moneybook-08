import { Store } from './store.js';

export class HistoryStore extends Store {
  constructor() {
    super();

    this.state = {
      list: [
        { category: '문화/여가', title: '영화보기', paidType: '현대카드', amount: -10000 },
        { category: '식비', title: '영화보기', paidType: '현대카드', amount: -10000 },
        { category: '교육비', title: '도서 구매', paidType: '현대카드', amount: -10000 },
        { category: '문화/여가', title: '영화보기', paidType: '현대카드', amount: -10000 },
        { category: '문화/여가', title: '영화보기', paidType: '현대카드', amount: -10000 },
      ],
    };
  }
}
