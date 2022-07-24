import { router } from '../app.js';
import { Component } from '../components/Component.js';

export class StatisticsPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
    this.removeSubscriber = store.removeSubscriber;
    store.addSubscriber('statisticsPage', this.updateState);
  }
  render() {
    const elements = `
    <h1>Statistics</h1>
    <button id = 'plus-button'>+</button>
    <p>${this.state.count}</p>
    <button id = 'minus-button'>-</button>
   

    `;
    this.setTemplate(elements);
    this.setEvents();
    return this.templateContent();
  }
  setEvents() {
    const templateContent = this.templateContent();
    const plusBtn = templateContent.querySelector('#plus-button');
    const minusBtn = templateContent.querySelector('#minus-button');

    plusBtn.addEventListener('click', this.handlePlus);
    minusBtn.addEventListener('click', this.handleMinus);
  }

  handlePlus = () => {
    this.setState({ count: this.state.count + 1 });
  };
  handleMinus = () => {
    this.setState({ count: this.state.count - 1 });
  };
  updateState = () => {
    this.removeSubscriber('statisticsPage');
    router();
  };
}
