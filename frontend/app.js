import { Header } from './components/Header/Header.js';
import { CalendarPage } from './pages/CalendarPage.js';
import { MainPage } from './pages/MainPage.js';
import { StatisticsPage } from './pages/StatisticsPage.js';
import { HistoryStore } from './store/historyStore.js';
import { StatisticsStore } from './store/statisticsStore.js';
import { ROUTES } from './utils/constant.js';

const historyStore = new HistoryStore();
const statisticsStore = new StatisticsStore();

const PAGE_TYPE = [
  { path: ROUTES.MAIN, view: MainPage, store: historyStore },
  { path: ROUTES.CALENDAR, view: CalendarPage, store: historyStore },
  { path: ROUTES.STATISTICS, view: StatisticsPage, store: statisticsStore },
];

export const router = () => {
  const potentialMatches = PAGE_TYPE.map(route => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });
  const match = potentialMatches.find(el => el.isMatch);
  const view = new match.route.view({ store: match.route.store });
  root.innerHTML = '';
  root.append(Header({ store: historyStore }));
  root.append(view.render());
};

export const App = () => {
  window.addEventListener('popstate', router);
  router();

  return;
};
