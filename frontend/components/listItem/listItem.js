import { CATEGORY_COLOR_TYPE, CATEGORY_TYPE_KOREAN } from '../../utils/constant.js';
import './ListItem.scss';

export const ListItem = ({ category, title, paidType, amount }) => {
  const listItem = document.createElement('div');
  listItem.setAttribute('class', 'listItem-wrapper');

  const listItemChildren = `
      
          <div class ='listItem-front'>
            <span class ='category-tag' style="background-color:${CATEGORY_COLOR_TYPE[category]}"> ${
    CATEGORY_TYPE_KOREAN[category]
  }</span>
            <span>${title}</span>
          </div>
          <span class ='listItem-paidType'>${paidType}</span>
          <span>${amount.toLocaleString('ko-KR')}원</span>
      
    `;
  listItem.insertAdjacentHTML('afterbegin', listItemChildren);
  listItem.addEventListener('click', handleClickList);
  return listItem;
};

const handleClickList = evt => {
  evt.target;
};
