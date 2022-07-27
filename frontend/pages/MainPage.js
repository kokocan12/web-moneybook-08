import { Component } from '../components/Component.js';
import { ListItem } from '../components/ListItem/ListItem.js';
import { InputBar } from '../components/InputBar/InputBar.js';
import { CheckBoxContents } from '../components/CheckboxContents/CheckboxContents.js';
export class MainPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
    this.store = store;
  }
  render() {
    const inputBar = new InputBar({ setState: this.setState, state: this.state, store: this.store }).render();
    const listCount = this.state.histories.reduce((pre, curr) => pre + curr.list.length, 0);
    const mainPage = document.createElement('div');
    const checkBoxContents = CheckBoxContents(listCount, this.state.totalIncome, this.state.totalExpenditure);
    mainPage.classList.add('page-wrapper');

    const listItems = this.state.histories.map(history =>
      ListItem(history, this.state.categories, this.state.paymentTypes),
    );

    mainPage.append(inputBar, checkBoxContents, ...listItems);
    this.setTemplate(mainPage);
    return this.templateContent();
  }
}
