import { Component } from '../components/Component.js';

export class MainPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
  }
  render() {
    const elements = `
    <h1>hello world</h1>
    ${this.state.list.map(item => listItem({ id: item.id, contents: item.contents })).join('')}
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

function listItem({ id, contents }) {
  const div = document.createElement('div');

  div.innerHTML = `
    <li id="${id}">${contents}</li>
    `;

  return div.innerHTML;
}
