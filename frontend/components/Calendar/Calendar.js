import { Component } from '../Component.js';
import './calendar.scss';

export class Calenar extends Component {
  constructor(store) {
    super();
    this.state = store;
    this.CURRENT_DATE = new Date();
    this.SELECTED_DATE = new Date(this.state.date);
  }

  render() {
    const calendarComponent = document.createElement('div');
    calendarComponent.setAttribute('id', 'calendar-component-container');
    calendarComponent.append(this.drawDay(), this.drawCalendar(), this.drawTotalMoney());

    this.setTemplate(calendarComponent);

    return this.templateContent();
  }
  getSelectedDate() {
    return {
      year: this.SELECTED_DATE.getFullYear(),
      month: this.SELECTED_DATE.getMonth() + 1,
      date: this.SELECTED_DATE.getDate(),
    };
  }
  getMonthData() {
    const lastDate = new Date(this.getSelectedDate().year, this.getSelectedDate().month, 0);
    const startDate = new Date(this.getSelectedDate().year, this.getSelectedDate().month - 1, 1);
    const weekCount = Math.ceil((lastDate.getDate() + startDate.getDay()) / 7);
    return {
      lastDate: lastDate.getDate(),
      startDay: startDate.getDay(),
      lastDay: lastDate.getDay(),
      weekCount,
    };
  }
  drawDay() {
    const dayContainer = document.createElement('div');
    dayContainer.setAttribute('id', 'day-container');
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const dayInnerHTML = `${days.map(day => `<div>${day}</div>`).join('')}`;
    dayContainer.insertAdjacentHTML('afterbegin', dayInnerHTML);

    return dayContainer;
  }
  drawCalendar() {
    const SATURDAY = 6;
    const SUNDAY = 0;

    const caledarContainer = document.createElement('div');
    caledarContainer.setAttribute('id', 'calendar-container');

    const getCalendarInnerHTML = date =>
      date
        ? `<div class ='calendar-day'><span class = 'day-marker'>${date}</span></div>`
        : `<div class ='calendar-day'></div>`;

    let calendarInnerHTML = '';
    if (this.getMonthData().startDay === SUNDAY) {
      for (let date = 1; date <= this.getMonthData().lastDate; date++) {
        calendarInnerHTML += getCalendarInnerHTML(date);
      }
    } else {
      for (let prev = 0; prev < this.getMonthData().startDay; prev++) {
        calendarInnerHTML += getCalendarInnerHTML();
      }
      for (let date = 1; date <= this.getMonthData().lastDate; date++) {
        calendarInnerHTML += getCalendarInnerHTML(date);
      }
    }
    if (this.getMonthData().lastDay !== SATURDAY) {
      for (let last = 0; last < SATURDAY - this.getMonthData().lastDay; last++) {
        calendarInnerHTML += getCalendarInnerHTML();
      }
    }
    caledarContainer.insertAdjacentHTML('afterbegin', calendarInnerHTML);

    if (this.SELECTED_DATE.getMonth() == this.CURRENT_DATE.getMonth())
      caledarContainer.childNodes.forEach(child =>
        child.innerText == this.CURRENT_DATE.getDate() ? child.classList.add('today') : null,
      );

    return caledarContainer;
  }

  drawTotalMoney() {
    const TOTAL = 5480000;
    const TOTAL_INCOME = 4000000;
    const TOTAL_EXPENDITURE = 4030200;
    const totalMoneyContainer = document.createElement('div');
    totalMoneyContainer.setAttribute('id', 'total-money-container');

    const totalInnerHTML = `
      <div>
        <span>총 수입 : ${TOTAL_INCOME.toLocaleString('ko-KR')} 원</span>
        <span>총 지출 : ${TOTAL_EXPENDITURE.toLocaleString('ko-KR')} 원</span>
      </div>
      <span>총계 : ${TOTAL.toLocaleString('ko-KR')} 원</span>
    `;

    totalMoneyContainer.insertAdjacentHTML('afterbegin', totalInnerHTML);
    return totalMoneyContainer;
  }
}
