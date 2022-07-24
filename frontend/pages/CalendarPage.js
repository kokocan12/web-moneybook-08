import { Calenar } from '../components/Calendar/Calendar.js';
import { Component } from '../components/Component.js';

export class CalendarPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
  }
  render() {
    const calendarPage = document.createElement('div');

    calendarPage.classList.add('page-wrapper');
    const calendar = new Calenar(this.state);
    calendarPage.append(calendar.render());
    this.setTemplate(calendarPage);

    return this.templateContent();
  }
}
