import './ListItem.scss';
export const ListItem = ({ category, title, paidType, amount }) => {
  const listItem = `
        <div class ='listItem-wrapper'>
          <div class ='listItem-front'>
            <span class ='category-tag'> ${category}</span>
            <span>${title}</span>
          </div>
          <span>${paidType}</span>
          <span>${amount.toLocaleString('ko-KR')}원</span>
        </div>
    `;

  return listItem;
};
