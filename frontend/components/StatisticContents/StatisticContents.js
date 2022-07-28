import { Component } from '../Component.js';
import { DoughnutChart } from '../DoughnutChart/DoughnutChart.js';
import { CATEGORY_COLOR_TYPE, CATEGORY_TYPE, CATEGORY_TYPE_KOREAN, DAY_KOREAN } from '../../utils/constant.js';
import './statisticContents.scss';
import { LineChart } from '../LineChart/LineChart.js';

export class StatisticContents extends Component {
  constructor(data, setState) {
    super();
    this.data = data;
    this.setState = setState;
  }
  render() {
    const statisticContentsContainer = document.createElement('div');
    statisticContentsContainer.setAttribute('id', 'statisticContents-component-container');
    const statisticContents = document.createElement('div');
    statisticContents.setAttribute('id', 'statisticContents-wrapper');

    const doughnutChart = new DoughnutChart(this.data, this.setState);
    statisticContents.append(doughnutChart.render(), this.drawList());


    statisticContentsContainer.append(
      statisticContents,
      this.drawLineChartContents(this.data.lastSixMonthExpenditure),
      ...this.data.histories?.map(item => this.drawSelectedCategoryItemList(item)),
    );

    this.setTemplate(statisticContentsContainer);
    return this.templateContent();
  }

  drawList() {
    const TOTAL = this.data.categoriesMonth.reduce((acc, curr) => acc + curr.total, 0);
    const expenditureList = this.data.categoriesMonth.filter(
      item =>
        item.category !== CATEGORY_TYPE.ALLOWANCE &&
        item.category !== CATEGORY_TYPE.SALARY &&
        item.category !== CATEGORY_TYPE.ETC,
    );
    const listContainer = document.createElement('div');
    listContainer.setAttribute('id', 'statistic- list-container');
    const listInnerHTML = `
        <span class ='totalExpenditure'>이번 달 지출 금액 ${TOTAL.toLocaleString('ko-KR')} 원</span>
        <div>
            ${expenditureList
              .map(
                item =>
                  `<div class = 'list-history-wrapper'>
                <div class ='listItem-front'>
                  <span class ='category-tag' style="background-color:${CATEGORY_COLOR_TYPE[item.category]}">${
                    CATEGORY_TYPE_KOREAN[item.category]
                  }</span> 
                    <span>${(item.percent * 100).toFixed(1)}%</span>
                </div>
                 
                  <span>${item.total.toLocaleString('ko-KR')}원</span>
                  
            </div>
                `,
              )
              .join('')}
        
        </div>
    `;
    listContainer.insertAdjacentHTML('afterbegin', listInnerHTML);
    return listContainer;
  }
  drawLineChartContents() {
    const sixMonthData = this.data.lastSixMonthExpenditure;
    const selectedCategory = this.data.selectedCategory;
    const contents = document.createElement('div');
    contents.classList.add('line-contents-container');
    if (selectedCategory) {
      contents.classList.add('open');
    } else contents.classList.remove('open');

    const titleElement = document.createElement('span');
    titleElement.innerText = `${CATEGORY_TYPE_KOREAN[selectedCategory]} 카테고리 소비 추이 `;
    const lineChart = new LineChart(sixMonthData, selectedCategory);

    contents.append(titleElement, lineChart.render());

    return contents;
  }

  drawSelectedCategoryItemList = history => {
    const listItem = document.createElement('div');
    listItem.setAttribute('class', 'listItem-wrapper');

    const historyDate = new Date(history.date);
    const month = historyDate.getMonth() + 1;
    const date = historyDate.getDate();
    const day = historyDate.getDay();

    const listItemChildren = `
    <div class ='list-date-wrapper'>
     <div>
        <span class = 'date'>${month}월 ${date}일 </span>
        <span class ='day'> ${DAY_KOREAN[day]}</span>
     </div>
    </div>
    ${history.list
      .map(({ title, amount }) => {
        return `
      <div class = 'list-history-wrapper'>
        <div class ='listItem-front'>
          <span class ='category-tag' style="background-color:${CATEGORY_COLOR_TYPE[this.data.selectedCategory]}">${
          CATEGORY_TYPE_KOREAN[this.data.selectedCategory]
        }</span> 
          <span>${title}</span>
        </div>
          <span class ='listItem-paidType'></span>
          <span>${Math.abs(amount).toLocaleString('ko-KR')}원</span>
      </div>`;
      })
      .join('')}
  
  
  `;

    listItem.insertAdjacentHTML('afterbegin', listItemChildren);

    return listItem;
  };
}
