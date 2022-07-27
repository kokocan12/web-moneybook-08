import { CATEGORY_COLOR_TYPE, CATEGORY_TYPE_KOREAN, DAY_KOREAN } from '../../utils/constant.js';
import './listItem.scss';

/**
 *
 * @param {{date:string; totalIncome:number; totalExpenditure:number;list:Array;}} history
 * @returns
 */
export const ListItem = (history, categories, paymentTypes) => {
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
            ? `<span class = 'income'>수입 ${Math.abs(history.totalIncome).toLocaleString('ko-KR')} 원 </span>`
            : ''
        }
        ${
          history.totalExpenditure
            ? `<span class = 'expenditure'>지출 ${Math.abs(history.totalExpenditure).toLocaleString('ko-KR')} 원</span>`
            : ''
        }
    </div> 
    </div>
    ${history.list
      .map(({ title, payment_type, amount, category }) => {
        const currentCategory = categories.find(item => item.id == category);
        const currnetPaymentType = paymentTypes.find(item => item.id == payment_type);

        return `
      <div class = 'list-history-wrapper'>
        <div class ='listItem-front'>
          <span class ='category-tag' style="background-color:${CATEGORY_COLOR_TYPE[currentCategory.name_en]}"> ${
          currentCategory ? currentCategory.name_ko : null
        }</span> 
          <span>${title}</span>
        </div>
          <span class ='listItem-paidType'>${currnetPaymentType ? currnetPaymentType.name : null}</span>
          <span>${Math.abs(amount).toLocaleString('ko-KR')}원</span>
      </div>`;
      })
      .join('')}
  
  
  `;

  listItem.insertAdjacentHTML('afterbegin', listItemChildren);
  listItem.addEventListener('click', handleClickList);
  return listItem;
};

const handleClickList = evt => {
  evt.target;
};
