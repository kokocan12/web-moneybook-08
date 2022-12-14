import { CATEGORY_COLOR_TYPE } from '../../utils/constant.js';
import { Component } from '../Component.js';
import './doughnutChart.scss';

export class DoughnutChart extends Component {
  constructor(data, setState) {
    super();
    this.data = data;
    this.setState = setState;
    this.ratioList = data.categoriesMonth ? data.categoriesMonth.map(item => item.percent) : [];
  }

  render() {
    const chart = document.createElement('div');
    chart.setAttribute('id', 'doughnut-chart-wrapper');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '-1.5 -1.5 3 3');

    const DIAMETER = 2 * Math.PI;

    const acc = this.ratioList.reduce((result, value) => [...result, result[result.length - 1] + value], [0]);
    const getCoordinates = percent => {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    };
    const getPath = () => {
      const selectedCategory = this.data.selectedCategory;

      const paths = this.data.categoriesMonth.map((item, index) => {
        const [startX, startY] = getCoordinates(acc[index]);
        const [endX, endY] = getCoordinates(acc[index + 1]);
        const isLargeArc = item.percent > 0.5 ? 1 : 0;
        const fillSpace = DIAMETER * item.percent;
        const emptySpace = DIAMETER * (1 - item.percent);
        const animationDuration = 0.3;
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('data-category', `${item.category}`);
        path.setAttribute('d', `M ${startX} ${startY} A 1 1 0 ${isLargeArc} 1 ${endX} ${endY} M 0 0`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', CATEGORY_COLOR_TYPE[item.category]);
        path.setAttribute('stroke-width', '0.5');
        path.setAttribute('stroke-dasharray', `${fillSpace + 0.025} ${emptySpace}`);
        path.setAttribute('stroke-dashoffset', `${selectedCategory ? 0.025 : fillSpace + 0.025}`);

        const animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animation.setAttribute('attributeName', 'stroke-dashoffset');
        animation.setAttribute('begin', `${animationDuration * index}`);
        animation.setAttribute('from', `${fillSpace}`);
        animation.setAttribute('to', '0.025');
        animation.setAttribute('dur', `${animationDuration}`);
        animation.setAttribute('fill', `freeze`);

        if (!selectedCategory) {
          path.appendChild(animation);
        }

        return path.outerHTML;
      });
      return paths;
    };
    svg.innerHTML = getPath();
    chart.appendChild(svg);
    this.setTemplate(chart);
    this.setEvent();
    return this.templateContent();
  }
  setEvent() {
    const template = this.templateContent();
    const pathElements = template.querySelectorAll('path');
    pathElements.forEach(item => item.addEventListener('click', this.handleClickPath));
  }
  handleClickPath = evt => {
    const targetCategory = evt.target.dataset.category;
    this.setState({ selectedCategory: targetCategory });
  };
}
