import { Component } from '../Component.js';
import { DoughnutChart } from '../DoughnutChart/DoughnutChart.js';
import { CATEGORY_COLOR_TYPE, CATEGORY_TYPE_KOREAN } from '../../utils/constant.js';
import './statisticContents.scss';
import { LineChart } from '../LineChart/LineChart.js';

export class StatisticContents extends Component {
  constructor(data) {
    super();
    this.data = data;
  }
  render() {
    const data = { category: 'shopping' };
    const statisticContentsContainer = document.createElement('div');
    statisticContentsContainer.setAttribute('id', 'statisticContents-component-container');
    const statisticContents = document.createElement('div');
    statisticContents.setAttribute('id', 'statisticContents-wrapper');

    const doughnutChart = new DoughnutChart(this.data);
    statisticContents.append(doughnutChart.render(), this.drawList());

    statisticContentsContainer.append(statisticContents, this.drawLineChartContents(data));
    this.setTemplate(statisticContentsContainer);
    return this.templateContent();
  }

  drawList() {
    const TOTAL = 4400000;
    const listContainer = document.createElement('div');
    listContainer.setAttribute('id', 'statistic- list-container');
    const listInnerHTML = `
        <span class ='totalExpenditure'>이번 달 지출 금액 ${TOTAL.toLocaleString('ko-KR')}</span>
        <div>
            ${this.data.categoriesMonth
              .map(
                item =>
                  `<div class = 'list-history-wrapper'>
                <div class ='listItem-front'>
                  <span class ='category-tag' style="background-color:${CATEGORY_COLOR_TYPE[item.category]}">${
                    CATEGORY_TYPE_KOREAN[item.category]
                  }</span> 
                    <span>${item.percent * 100}%</span>
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
  drawLineChartContents(data) {
    const contents = document.createElement('div');
    contents.classList.add('line-contents-container');
    const titleElement = document.createElement('span');
    titleElement.innerText = `${CATEGORY_TYPE_KOREAN[data.category]} 카테고리 소비 추이 `;
    const lineChart = new LineChart();

    contents.append(titleElement, lineChart.render());

    return contents;
  }
}
