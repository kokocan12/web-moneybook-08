import { router } from '../../app.js';
import { ROUTES } from '../../utils/constant.js';
import './header.scss';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import rightArrowIcon from '../../assets/icons/right-arrow.svg';
import textIcon from '../../assets/icons/text.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import chartIcon from '../../assets/icons/chart.svg';
import { getNextMonth, getPrevMonth } from '../../utils/date.js';

export const Header = ({ store }) => {
  const currentDate = store.state.date;
  const currentMonth = +currentDate.split('-')[1];
  const currentYear = +currentDate.split('-')[0];

  const prevDate = getPrevMonth(currentDate);
  const nextDate = getNextMonth(currentDate);

  const header = document.createElement('header');
  const headerChild = `
    <a class="header-title" href =${ROUTES.MAIN}>우아한 가계부</a>
    <div class="month-wrap">
      <button class="arrow-wrap" data-date="${prevDate}">
        <img class="arrow-img" src="${leftArrowIcon}" alt="left-arrow" />
      </button>
      <div class="text-wrap">
        <span class="month-text">${currentMonth}월</span> 
        <span class="year-text">${currentYear}</span>
      </div>
      <button class="arrow-wrap" data-date="${nextDate}">
        <img class="arrow-img" src="${rightArrowIcon}" alt="right-arrow" />
      </button>
    </div>
    <div class="icon-wrap">
      <a class="text-icon ${location.pathname === ROUTES.MAIN ? 'active' : ''}" href="${ROUTES.MAIN}">
        <img src="${textIcon}" alt="text-icon" />
      </a>
      <a class="calendar-icon ${location.pathname === ROUTES.CALENDAR ? 'active' : ''}" href="${ROUTES.CALENDAR}">
        <img src="${calendarIcon}" alt="calendar-icon" />
      </a>
      <a class="chart-icon ${location.pathname === ROUTES.STATISTICS ? 'active' : ''}" href="${ROUTES.STATISTICS}">
        <img src="${chartIcon}" alt="chart-icon" />
      </a>
    </div>
  `;
  header.insertAdjacentHTML('afterbegin', headerChild);
  header.style.display = 'flex';
  header.querySelectorAll('a').forEach(aTag => aTag.addEventListener('click', handleClickPage));
  header
    .querySelectorAll('.arrow-wrap')
    .forEach(item => item.addEventListener('click', handleClickArrow.bind(null, store)));

  return header;
};

const handleClickPage = evt => {
  evt.preventDefault();
  const href = evt.currentTarget.getAttribute('href');
  history.pushState(null, null, href);
  router();
};

const handleClickArrow = (store, evt) => {
  const { date } = evt.currentTarget.dataset;
  store.setState({ date });
  store.getHistory();
};
