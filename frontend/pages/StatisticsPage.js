import { Component } from '../components/Component.js';

export class StatisticsPage extends Component {
  constructor() {
    super();
  }
  render() {
    const elements = `
    <h1>Statistics</h1>
    `;
    this.setTemplate(elements);

    return this.templateContent;
  }
}
