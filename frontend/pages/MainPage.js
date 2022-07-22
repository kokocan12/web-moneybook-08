import { Component } from '../components/Component.js';
import { ListItem } from '../components/ListItem/ListItem.js';

export class MainPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
  }
  render() {
    const elements = document.createElement('div');
    elements.classList.add('page-wrapper');

    const listItems = this.state.list.map(({ category, amount, title, paidType }) => {
      return ListItem({ category, title, paidType, amount });
    });
    elements.append(...listItems);
    this.setTemplate(elements);

    return this.templateContent();
  }
}
