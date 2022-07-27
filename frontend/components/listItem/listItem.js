import { router } from '../../app.js';
import { CATEGORY_COLOR_TYPE, CATEGORY_TYPE_KOREAN, DAY_KOREAN } from '../../utils/constant.js';
import './listItem.scss';

/**
 *
 * @param {{date:string; totalIncome:number; totalExpenditure:number;list:Array;}} history
 * @returns
 */
export const ListItem = (history, categories, paymentTypes, store) => {
  const listItem = document.createElement('div');
  listItem.setAttribute('class', 'listItem-wrapper');

  const historyDate = new Date(history.date);
  const year = historyDate.getFullYear();
  const month = historyDate.getMonth() + 1;
  const date = historyDate.getDate();
  const day = historyDate.getDay();

  const dateString = `${year}-${month >= 10 ? month : `0${month}`}-${date >= 10 ? date : `0${date}`}`;

  const { incomeChecked, expenditureChecked } = store.state.checkboxContents;

  const listItemChildren = `
    <div class ='list-date-wrapper'>
     <div>
        <span class = 'date'>${month}월 ${date}일 </span>
        <span class ='day'> ${DAY_KOREAN[day]}</span>
     </div> 
     <div>
        ${
          history.totalIncome && incomeChecked
            ? `<span class = 'income'>수입 ${Math.abs(history.totalIncome).toLocaleString('ko-KR')} 원 </span>`
            : ''
        }
        ${
          history.totalExpenditure && expenditureChecked
            ? `<span class = 'expenditure'>지출 ${Math.abs(history.totalExpenditure).toLocaleString('ko-KR')} 원</span>`
            : ''
        }
    </div> 
    </div>
    ${history.list
      .map(({ id, title, payment_type, amount, category }) => {
        const currentCategory = categories.find(item => item.id == category);
        const currnetPaymentType = paymentTypes.find(item => item.id == payment_type);

        if (!incomeChecked && amount > 0) return '';

        if (!expenditureChecked && amount < 0) return '';

        return `
      <div class = 'list-history-wrapper' data-id="${id}" data-title="${title}" data-payment_type="${payment_type}" data-amount="${amount}" data-category="${category}" data-category_name="${
          currentCategory?.name_ko
        }" data-payment_type_name="${currnetPaymentType?.name ?? ''}" data-date="${dateString}">
        <div class ='listItem-front'>
          <span class ='category-tag' style="background-color:${CATEGORY_COLOR_TYPE[currentCategory.name_en]}"> ${
          currentCategory ? currentCategory.name_ko : null
        }</span> 
          <span>${title}</span>
        </div>
          <span class ='listItem-paidType'>${currnetPaymentType ? currnetPaymentType.name : ''}</span>
          <span>${Math.abs(amount).toLocaleString('ko-KR')}원</span>
      </div>`;
      })
      .join('')}
  
  
  `;

  listItem.insertAdjacentHTML('afterbegin', listItemChildren);
  listItem.addEventListener('click', handleClickList.bind(null, store));

  if (!(history.totalIncome && incomeChecked) && !(history.totalExpenditure && expenditureChecked)) return null;

  return listItem;
};

const handleClickList = (store, evt) => {
  const wrapper = evt.target.closest('.list-history-wrapper');

  if (!wrapper) return;

  const { id, amount, category, category_name, payment_type, payment_type_name, title, date } = wrapper.dataset;
  store.setState({
    inputBar: {
      ...store.state.inputBar,
      ...{
        currentDate: date,
        id: +id,
        amount,
        category,
        categoryName: category_name,
        paymentType: payment_type,
        paymentTypeName: payment_type_name,
        title,
      },
    },
  });
  router();
};
