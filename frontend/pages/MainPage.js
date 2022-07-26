import { Component } from '../components/Component.js';
import { ListItem } from '../components/ListItem/ListItem.js';
import { InputBar } from '../components/InputBar/InputBar.js';
import { CheckBoxContents } from '../components/CheckboxContents/CheckboxContents.js';
export class MainPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
  }
  render() {
    const { categories, paymentMethods } = this.state.inputBar;
    const inputBar = new InputBar({ categories, paymentMethods, setState: this.setState }).render();
    const listCount = this.state.histories.reduce((pre, curr) => pre + curr.list.length, 0);
    const mainPage = document.createElement('div');
    const checkBoxContents = CheckBoxContents(listCount, this.state.totalIncome, this.state.totalExpenditure);
    mainPage.classList.add('page-wrapper');

    const listItems = this.state.histories.map(history => ListItem(history));

    mainPage.append(inputBar, checkBoxContents, ...listItems);
    this.setTemplate(mainPage);
    return this.templateContent();
  }
}
