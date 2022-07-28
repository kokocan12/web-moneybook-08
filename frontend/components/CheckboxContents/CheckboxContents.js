import './checkBoxContents.scss';
import checkboxIcon from '../../assets/icons/checkbox-small-active.svg';
import { router } from '../../app.js';

export const CheckBoxContents = store => {
  const checkBoxContents = document.createElement('div');
  checkBoxContents.setAttribute('id', 'checkbox-contents-wrapper');

  const { incomeChecked, expenditureChecked } = store.state.checkboxContents;
  const { totalMonthIncome, totalMonthExpenditure } = store.state;

  const totalCount = store.state.histories.reduce((acc, curr) => {
    let count = 0;
    curr.list.forEach(item => {
      if (item.amount > 0 && incomeChecked) {
        count += 1;
      }

      if (item.amount < 0 && expenditureChecked) {
        count += 1;
      }
    });

    return acc + count;
  }, 0);

  const checkBoxInnerHTML = `
      <span class = 'totalListCount'>전체 내역 ${totalCount}건</span>
      <div>
        <img data-type="income" class="checkbox ${
          incomeChecked ? 'active' : ''
        }" src='${checkboxIcon}' id = 'checkbox-income'/>
        <span class="checkbox-text ${incomeChecked ? 'active' : ''}" >수입 ${totalMonthIncome.toLocaleString()}원</span>
        <img data-type="expenditure" class="checkbox ${
          expenditureChecked ? 'active' : ''
        }" src='${checkboxIcon}'id = 'checkbox-expenditure'/>
        <span class="checkbox-text ${expenditureChecked ? 'active' : ''}">지출 ${Math.abs(
    totalMonthExpenditure,
  ).toLocaleString()}원</span>
      </div>
    
    `;
  checkBoxContents.insertAdjacentHTML('afterbegin', checkBoxInnerHTML);
  const checkboxIncome = checkBoxContents.querySelector('#checkbox-income');
  const checkboxExpenditure = checkBoxContents.querySelector('#checkbox-expenditure');
  checkboxIncome.addEventListener('click', handleClickCheckbox.bind(null, store));
  checkboxExpenditure.addEventListener('click', handleClickCheckbox.bind(null, store));

  return checkBoxContents;
};
const handleClickCheckbox = (store, { currentTarget }) => {
  const { type } = currentTarget.dataset;

  if (type === 'income') {
    store.setState({
      checkboxContents: { ...store.state.checkboxContents, incomeChecked: !store.state.checkboxContents.incomeChecked },
    });
  } else if (type === 'expenditure') {
    store.setState({
      checkboxContents: {
        ...store.state.checkboxContents,
        expenditureChecked: !store.state.checkboxContents.expenditureChecked,
      },
    });
  }

  router();
};
