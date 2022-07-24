import { Component } from '../components/Component.js';
import { ListItem } from '../components/ListItem/ListItem.js';
import { InputBar } from '../components/InputBar/InputBar.js';

export class MainPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
  }
  render() {
    const { categories, paymentMethods } = this.state.inputBar;
    const inputBar = new InputBar({ categories, paymentMethods, setState: this.setState }).render();

    const elements = document.createElement('div');
    elements.classList.add('page-wrapper');

    const listItems = this.state.list.map(({ category, amount, title, paidType }) => {
      return ListItem({ category, title, paidType, amount });
    });

    elements.append(inputBar, ...listItems);
    this.setTemplate(elements);

    return this.templateContent();
  }
}
