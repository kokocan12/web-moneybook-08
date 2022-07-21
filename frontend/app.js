import { Header } from './components/Header.js';
import { CalendarPage } from './pages/CalendarPage.js';
import { MainPage } from './pages/MainPage.js';
import { StatisticsPage } from './pages/StatisticsPage.js';
import { HistoryStore } from './store/historyStore.js';
import { ROUTES } from './utils.js';

export const router = () => {
  const historyStore = new HistoryStore();
  const PAGE_TYPE = [
    { path: ROUTES.MAIN, view: MainPage },
    { path: ROUTES.CALENDAR, view: CalendarPage },
    { path: ROUTES.STATISTICS, view: StatisticsPage },
  ];
  const potentialMatches = PAGE_TYPE.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });
  const match = potentialMatches.find(el => el.isMatch);
  const view = new match.route.view({ store: historyStore });
  root.innerHTML = '';
  root.append(Header());
  root.append(view.render());
};

export const App = () => {
  window.addEventListener('popstate', router);
  router();
  return;
};
