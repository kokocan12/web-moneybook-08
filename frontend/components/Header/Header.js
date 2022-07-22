import { router } from '../../app.js';
import { ROUTES } from '../../utils.js';
import './header.scss';
import leftArrowIcon from '../../assets/icons/left-arrow.svg';
import rightArrowIcon from '../../assets/icons/right-arrow.svg';
import textIcon from '../../assets/icons/text.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import chartIcon from '../../assets/icons/chart.svg';
import { modal } from '../Modal/Modal.js';

export const Header = () => {
  const header = document.createElement('header');
  const headerChild = `
    <a class="header-title" href =${ROUTES.MAIN}>우아한 가계부</a>
    <div class="month-wrap">
      <button class="arrow-wrap">
        <img class="arrow-img" src="${leftArrowIcon}" alt="left-arrow" />
      </button>
      <div class="text-wrap">
        <span class="month-text">7월</span> 
        <span class="year-text">2022</span>
      </div>
      <button class="arrow-wrap">
        <img class="arrow-img" src="${rightArrowIcon}" alt="right-arrow" />
      </button>
    </div>
    <div class="icon-wrap">
      <a class="text-icon active" href="${ROUTES.MAIN}">
        <img src="${textIcon}" alt="text-icon" />
      </a>
      <a class="calendar-icon" href="${ROUTES.CALENDAR}">
        <img src="${calendarIcon}" alt="calendar-icon" />
      </a>
      <a class="chart-icon" href="${ROUTES.STATISTICS}">
        <img src="${chartIcon}" alt="chart-icon" />
      </a>
    </div>
  `;
  header.insertAdjacentHTML('afterbegin', headerChild);
  header.style.display = 'flex';
  header.querySelectorAll('a').forEach(aTag => aTag.addEventListener('click', handleClickPage));

  header.querySelector('.month-text').addEventListener('click', () => {
    modal.input(
      '추가하실 결제수단을 적어주세요.',
      () => modal.clear(),
      () => modal.clear(),
    );
  });
  return header;
};

const handleClickPage = e => {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  history.pushState(null, null, href);
  router();
};
