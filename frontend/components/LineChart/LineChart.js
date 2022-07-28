import { Component } from '../Component.js';
import './lineChart.scss';

export class LineChart extends Component {
  constructor(data) {
    super();
    this.data = data;
    this.fakeData = [400, 4300, 33000, 20000, 3000, 400, 4300, 33000, 20000, 3000];
  }
  SVGWidthRatio = 2.66;
  SVGHeightRatio = 1;

  getCoordinates() {
    const MONTH = 24;
    const X_GAP = this.SVGWidthRatio / (MONTH - 1);
    const MAX_AMOUNT = Math.max(...this.fakeData);

    return this.fakeData.reduce(
      (acc, curr, index) => [
        ...acc,
        { x: X_GAP * index * 2, y: (curr / MAX_AMOUNT) * this.SVGHeightRatio, amount: curr },
      ],
      [],
    );
  }
  render() {
    const chart = document.createElement('div');
    chart.setAttribute('id', 'line-chart-wrapper');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const monthText = document.createElement('div');
    monthText.classList.add('monthText');
    let monthInnerHTML = ``;
    for (let i = 0; i < 12; i++) {
      monthInnerHTML += `<span>${i + 1}</span>`;
    }
    monthText.innerHTML = monthInnerHTML;
    svg.setAttribute('viewBox', `0 0 ${this.SVGWidthRatio} ${this.SVGHeightRatio}`);
    svg.setAttribute('id', 'line-chart-svg');

    svg.insertAdjacentHTML('beforeend', this.drawGraph().circleElements);
    svg.insertAdjacentHTML('beforeend', this.drawBackground().columns);
    svg.insertAdjacentHTML('beforeend', this.drawBackground().rows);
    svg.insertAdjacentHTML('beforeend', this.drawBackground().border);
    svg.insertAdjacentHTML('beforeend', this.drawAmountText());

    svg.append(this.drawGraph().graphPath);
    chart.append(svg, monthText);
    this.setTemplate(chart);

    return this.templateContent();
  }
  drawGraph() {
    const graphPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const coordiDate = this.getCoordinates();

    const dData = coordiDate.reduce((acc, curr, index) => {
      if (index == 0) {
        return `M${curr.x} ${curr.y}`;
      }
      return `${acc} L${curr.x} ${curr.y}`;
    }, '');

    const circleElements = coordiDate.reduce((acc, curr) => {
      return `${acc}` + `<circle cx =${curr.x} cy =${curr.y} r ='0.008 '></circle>`;
    }, '');
    graphPath.setAttribute('d', `${dData}`);
    graphPath.classList.add('id', `graph-path`);

    graphPath.setAttribute('fill', 'none');
    graphPath.setAttribute('stroke-width', '0.008');

    return { graphPath, circleElements };
  }
  drawBackground() {
    const border = `<path d = 'M0 0 H${this.SVGWidthRatio} V${this.SVGHeightRatio} H0 V0  Z' stroke-width= '0.002' class = 'background-path'></path>`;
    const gap = this.SVGWidthRatio / 24;
    let columns = '';
    let rows = '';
    for (var col = 0; col < 24; col++) {
      columns += `<path d = 'M${gap * col} 0 V1 Z' stroke-width= '0.002' class = 'background-path'></path>`;
    }
    for (var row = 0; row < 10; row++) {
      rows += `<path d = 'M0 ${gap * row}  H2.66 Z' stroke-width= '0.002' class = 'background-path'></path>`;
    }

    return { border, columns, rows };
  }
  drawAmountText() {
    const coordiDate = this.getCoordinates();

    const textElements = coordiDate.reduce((acc, curr) => {
      return (
        `${acc}` +
        `<text x =${curr.x} y =${curr.y * -1}  font-size ='0.05' font-weight='100' text-anchor='start'>${
          curr.amount
        }</text>`
      );
    }, '');
    return textElements;
  }
  drawMonthText() {
    let monthElements = '';
    const gap = this.SVGWidthRatio / 12;

    for (var i = 0; i < 12; i++) {
      monthElements += `<text x =${
        gap * i + 0.02
      } y =0.08  font-size ='0.08' font-weight='500' text-anchor='end' fill='#8D9393'>${i + 1}</text>`;
    }

    return monthElements;
  }
}
