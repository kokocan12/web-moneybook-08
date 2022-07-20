import { Component } from '../components/Component.js';

export class CalendarPage extends Component {
  constructor() {
    super();
  }
  render() {
    const elements = `
    <h1>Calendar</h1>
    `;
    this.setTemplate(elements);

    return this.templateContent;
  }
}
