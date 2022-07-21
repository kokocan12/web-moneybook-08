import { Component } from '../components/Component.js';
import { ListItem } from '../components/ListItem/ListItem.js';

export class MainPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
  }
  render() {
    const elements = `
    <h1>hello world</h1>
    ${this.state.list
      .map(({ category, amount, title, paidType }) => ListItem({ category, title, paidType, amount }))
      .join('')}
    <button>click!</button>
    `;
    this.setTemplate(elements);
    const handleClickButton = () => {
      console.log('click!');
    };
    this.addEventListener('button', 'click', handleClickButton);

    return this.templateContent;
  }
}
