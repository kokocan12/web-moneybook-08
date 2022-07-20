import { Store } from './store.js';

export class HistoryStore extends Store {
  constructor() {
    super();

    this.state = {
      list: [
        { id: '1', contents: 'hi' },
        { id: '2', contents: 'hi' },
        { id: '3', contents: 'hi' },
        { id: '4', contents: 'hi' },
      ],
    };
  }
}
