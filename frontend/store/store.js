export class Store {
  constructor() {
    this.state = {};
    this.subscribers = [];
  }
  setState(newState) {
    this.state = { ...this.state, ...newState };
  }
  addSubscriber(key, callback) {
    this.subscribers.push({ key, value: callback });
  }
  removeSubscriber(key) {
    this.subscribers.filter(subscriber => subscriber.key !== key);
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber.value());
  }
}
