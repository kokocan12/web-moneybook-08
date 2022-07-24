import { Header } from './components/Header/Header.js';
import { CalendarPage } from './pages/CalendarPage.js';
import { MainPage } from './pages/MainPage.js';
import { StatisticsPage } from './pages/StatisticsPage.js';
import { HistoryStore } from './store/historyStore.js';
import { CATEGORY_TYPE_KOREAN, ROUTES } from './utils/constant.js';

/**
 *  dummy data, db 연동 후 삭제
 */
const PAYMENT_TYPE = {
  CASH: '현금',
  CARD: '현대카드',
};

const historyStore = new HistoryStore({ categories: CATEGORY_TYPE_KOREAN, paymentMethods: PAYMENT_TYPE });

export const router = () => {
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
