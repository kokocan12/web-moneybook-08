import { CATEGORY_COLOR_TYPE, CATEGORY_TYPE_KOREAN, DAY_KOREAN } from '../../utils/constant.js';
import './listItem.scss';

/**
 *
 * @param {{date:string; totalIncome:number; totalExpenditure:number;list:Array;}} history
 * @returns
 */
export const ListItem = history => {
  const listItem = document.createElement('div');
  listItem.setAttribute('class', 'listItem-wrapper');

  const month = new Date(history.date).getMonth() + 1;
  const date = new Date(history.date).getDate();
  const day = new Date(history.date).getDay();

  const listItemChildren = `
    <div class ='list-date-wrapper'>
     <div>
        <span class = 'date'>${month}월 ${date}일 </span>
        <span class ='day'> ${DAY_KOREAN[day]}</span>
     </div> 
     <div>
        ${
          history.totalIncome
            ? `<span class = 'income'>수입 ${history.totalIncome.toLocaleString('ko-KR')} 원 </span>`
            : ''
        }
        ${
          history.totalExpenditure
            ? `<span class = 'expenditure'>지출 ${history.totalExpenditure.toLocaleString('ko-KR')} 원</span>`
            : ''
        }
    </div> 
    </div>
    ${history.list
      .map(
        ({ category, title, payment_type, amount }) => `
      <div class = 'list-history-wrapper'>
        <div class ='listItem-front'>
          <span class ='category-tag' style="background-color:${CATEGORY_COLOR_TYPE[category]}"> ${
          CATEGORY_TYPE_KOREAN[category]
        }</span>
          <span>${title}</span>
        </div>
          <span class ='listItem-paidType'>${payment_type}</span>
          <span>${amount.toLocaleString('ko-KR')}원</span>
          
    </div>`,
      )
      .join('')}
  
  
  `;

  listItem.insertAdjacentHTML('afterbegin', listItemChildren);
  listItem.addEventListener('click', handleClickList);
  return listItem;
};

const handleClickList = evt => {
  evt.target;
};
