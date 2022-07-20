import { Header } from './components/Header.js';
import { CalendarPage } from './pages/CalendarPage.js';
import { MainPage } from './pages/MainPage.js';
import { StatisticsPage } from './pages/StatisticsPage.js';
import { HistoryStore } from './store/historyStore.js';

const ROUTES = {
  MAIN: '/',
  CALENDAR: '/calendar',
  STATISTICS: '/statistics',
};
const PAGE_TYPE = {
  [ROUTES.MAIN]: MainPage,
  [ROUTES.CALENDAR]: CalendarPage,
  [ROUTES.STATISTICS]: StatisticsPage,
};

export class App {
  clear() {
    const container = this.$container;

    while (container.children.length) {
      container.removeChild(container.children[0]);
    }
  }
  reRender() {
    this.clear();
    const container = this.$container;
    const historyStore = new HistoryStore();
    const view = new PAGE_TYPE[location.pathname]({ store: historyStore });
    const header = new Header();

    container.append(header.render(), view.render());
  }

  render() {
    const container = document.createElement('div');
    const historyStore = new HistoryStore();

    const header = new Header();
    const view = new PAGE_TYPE[location.pathname]({ store: historyStore });

    container.append(header.render(), view.render());

    const atags = document.getElementsByTagName('a');
    atags.forEach(aTag =>
      aTag.addEventListener('click', e => {
        e.preventDefault();

        const href = e.target.getAttribute('href');

        history.pushState(null, null, href);

        this.reRender();
      }),
    );

    this.$container = container;
    return container;
  }
}
