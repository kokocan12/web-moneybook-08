import { Component } from '../components/Component.js';
import { ListItem } from '../components/listItem/ListItem.js';
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

    const mainPage = document.createElement('div');
    const checkBoxContents = CheckBoxContents(this.store);
    mainPage.classList.add('page-wrapper');

    const listItems = this.state.histories.map(history =>
      ListItem(history, this.state.categories, this.state.paymentTypes, this.store),
    );

    mainPage.append(inputBar, checkBoxContents, ...listItems.filter(item => item !== null));
    this.setTemplate(mainPage);
    return this.templateContent();
  }
}
