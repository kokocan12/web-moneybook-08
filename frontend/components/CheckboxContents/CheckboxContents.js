import './checkBoxContents.scss';
import checkboxIcon from '../../assets/icons/checkbox-small-active.svg';

export const CheckBoxContents = (listCount, totalIncome, totalExpenditure) => {
  const checkBoxContents = document.createElement('div');
  checkBoxContents.setAttribute('id', 'checkbox-contents-wrapper');
  const checkBoxInnerHTML = `
      
      <span class = 'totalListCount'>전체 내역 ${listCount}건</span>
      <div>

        <img src = '${checkboxIcon}' id = 'checkbox-income'/>
        <span>수입 ${totalIncome.toLocaleString('ko-KR')}원</span>
        <img src = '${checkboxIcon}'id = 'checkbox-expenditure'/>
        <span>지출 ${totalExpenditure.toLocaleString('ko-KR')}원</span>
      </div>
    
    `;
  checkBoxContents.insertAdjacentHTML('afterbegin', checkBoxInnerHTML);
  const checkboxIncome = checkBoxContents.querySelector('#checkbox-income');
  const checkboxExpenditure = checkBoxContents.querySelector('#checkbox-expenditure');
  checkboxIncome.addEventListener('click', handleClickCheckbox);
  checkboxExpenditure.addEventListener('click', handleClickCheckbox);

  return checkBoxContents;
};
const handleClickCheckbox = ({ target }) => {
  target;
};
