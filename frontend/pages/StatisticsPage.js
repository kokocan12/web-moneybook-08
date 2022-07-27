import { router } from '../app.js';
import { Component } from '../components/Component.js';
import { StatisticContents } from '../components/StatisticContents/StatisticContents.js';

export class StatisticsPage extends Component {
  constructor({ store }) {
    super();
    this.state = store.state;
    this.setState = store.setState;
    this.removeSubscriber = store.removeSubscriber;
    store.addSubscriber('statisticsPage', this.updateState);
  }
  render() {
    const statisticsPage = document.createElement('div');
    statisticsPage.classList.add('page-wrapper');
    const statisticContents = new StatisticContents(this.state);
    statisticsPage.append(statisticContents.render());
    this.setTemplate(statisticsPage);
    this.setEvents();
    return this.templateContent();
  }

  setEvents() {
    const templateContent = this.templateContent();
  }

  updateState = () => {
    this.removeSubscriber('statisticsPage');
    router();
  };
}
