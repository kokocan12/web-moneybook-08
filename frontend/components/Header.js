import { router } from '../app.js';
import { ROUTES } from '../utils.js';

export const Header = () => {
  const header = document.createElement('div');
  const headerChild = `
    <a href =${ROUTES.MAIN}>우아한 가계부</a>
    <div>
     7월
    </div>
    <div>
      <a href =${ROUTES.MAIN}>메인</a>
      <a href =${ROUTES.CALENDAR}>달력</a>
      <a href =${ROUTES.STATISTICS}>통계</a>
    </div>
  `;
  header.insertAdjacentHTML('afterbegin', headerChild);
  header.style.display = 'flex';
  header.querySelectorAll('a').forEach(aTag => aTag.addEventListener('click', handleClickPage));
  return header;
};

const handleClickPage = e => {
  e.preventDefault();
  const href = e.target.getAttribute('href');
  history.pushState(null, null, href);
  router();
};
