export class Store {
  constructor() {
    this.state = {};
    this.subscribers = [];
  }
  setState = newState => {
    Object.assign(this.state, newState);
    this.notify();
  };
  addSubscriber(key, callback) {
    this.subscribers.push({ key, value: callback });
  }
  removeSubscriber = key => {
    this.subscribers = this.subscribers.filter(subscriber => subscriber.key !== key);
  };

  notify = () => {
    this.subscribers.forEach(subscriber => subscriber.value(this.state));
  };
}
