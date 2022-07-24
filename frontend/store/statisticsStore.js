import { Store } from './store.js';

export class StatisticsStore extends Store {
  constructor() {
    super();
    this.state = { count: 0, name: '경민', age: '26' };
  }
}
