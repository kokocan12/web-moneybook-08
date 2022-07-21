import { Header } from './components/Header.js';
import { CalendarPage } from './pages/CalendarPage.js';
import { MainPage } from './pages/MainPage.js';
import { StatisticsPage } from './pages/StatisticsPage.js';
import { HistoryStore } from './store/historyStore.js';
import { ROUTES } from './utils.js';

const PAGE_TYPE = {
  [ROUTES.MAIN]: MainPage,
  [ROUTES.CALENDAR]: CalendarPage,
  [ROUTES.STATISTICS]: StatisticsPage,
};

export const App = () => {
  const historyStore = new HistoryStore();
  const app = document.createElement('div');
  const view = new PAGE_TYPE[location.pathname]({ store: historyStore });
  app.append(Header(), view.render());
  return app;
};
