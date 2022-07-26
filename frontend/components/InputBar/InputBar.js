import { Component } from '../Component.js';
import { modal } from '../Modal/Modal.js';
import './inputbar.scss';
import checkSubmit from '../../assets/icons/check-submit.svg';
import downArrow from '../../assets/icons/down-arrow.svg';
import deleteIcon from '../../assets/icons/delete-icon.svg';
import minusIcon from '../../assets/icons/minus-icon.svg';

export class InputBar extends Component {
  constructor({ categories, paymentMethods }) {
    super();

    this.categories = categories;
    this.paymentMethods = paymentMethods;
  }
  render() {
    const form = document.createElement('form');
    form.classList.add('input-bar-form');

    const dateInput = ` <div class="input-wrap">
                            <label class="item-label" for="input-bar-date">
                                일자
                            </label>
                            <input id="input-bar-date" class="input" type="text" readonly placeholder="입력하세요" autocomplete="off" />
                            <input id="date-picker" class="input" type="date"  />
                        </div>`;

    const categoryInput = ` <div class="input-wrap">
                                <label class="item-label" for="category-checkbox">
                                    분류
                                </label>
                                <input class="hidden" type="checkbox" id="category-checkbox" />
                                <label class="select-indicator" for="category-checkbox">
                                    <span class="select-indicator--text category-text">선택하세요</span>
                                    <img src="${downArrow}" />
                                </label>
                                <label class="select-box">
                                    <ul class="radio-wrap">
                                        ${Object.entries(this.categories)
                                          .map(([val, key]) => {
                                            return `<li class="radio-item">
                                                        <label class="label" for="${val}">${key}</label>
                                                    </li>`;
                                          })
                                          .join('')}
                                    </ul>
                                    <div class="select">
                                        ${Object.entries(this.categories)
                                          .map(([val, key]) => {
                                            return `<input type="radio" name="category" value="${key}" id="${val}" />`;
                                          })
                                          .join('')}
                                    </div>
                                </label>
                            </div>`;

    const contentsInput = ` <div class="input-wrap">
                                <label class="item-label" for="input-bar-contents">
                                    내용
                                </label>
                                <input id="input-bar-contents" class="input" type="text" placeholder="입력하세요" autocomplete="off" />
                            </div>`;

    const paymentMethodInput = `<div class="input-wrap">
                                    <label class="item-label" for="payment-mothod-checkbox">
                                        결제수단
                                    </label>
                                    <input class="hidden" type="checkbox" id="payment-mothod-checkbox" />
                                    <label class="select-indicator" for="payment-mothod-checkbox">
                                        <span class="select-indicator--text payment-method-text">선택하세요</span>
                                        <img src="${downArrow}" />
                                    </label>
                                    <label class="select-box" for="payment-mothod-checkbox">
                                        <ul class="radio-wrap">
                                            ${Object.entries(this.paymentMethods)
                                              .map(([val, key]) => {
                                                return `<li class="radio-item">
                                                            <label class="label" for="${val}">
                                                                <div class="radio-item--container">
                                                                    <span class="radio-item--container--text">${key}</span>
                                                                    <button type="button" class="radio-item--container--button">
                                                                        <img alt="delete-icon" src="${deleteIcon}" />
                                                                    </button>
                                                                </div>
                                                            </label>
                                                        </li>`;
                                              })
                                              .join('')}
                                            <li class="radio-item">
                                                <button type="button" class="label" id="payment-method-add-button">
                                                    <div class="radio-item--container">
                                                        <span class="radio-item--container--text">추가하기</span>
                                                    </div>
                                                </button>
                                            </li>
                                        </ul>
                                        <div class="select">
                                            ${Object.entries(this.paymentMethods)
                                              .map(([val, key]) => {
                                                return `<input type="radio" name="payment-method" value="${key}" id="${val}" />`;
                                              })
                                              .join('')}
                                        </div>
                                    </label>
                                </div>`;

    const priceInput = `<div class="input-wrap">
                            <label class="item-label" for="input-bar-price">
                                금액
                            </label>
                            <div class="price-input">
                                <div class="minus-icon-wrap hidden">
                                    <img src="${minusIcon}" alt="minus-icon" />
                                </div>
                                <div class="plus-icon-wrap hidden">
                                    <img src="${minusIcon}" alt="minus-icon" />
                                    <img src="${minusIcon}" alt="minus-icon" />
                                </div>
                                <input id="input-bar-price" class="input" type="text" placeholder="입력하세요" autocomplete="off" />
                                <span class="price-unit">원</span>
                            </div>
                        </div>`;

    const buttonWrap = `<button class="submit-button">
                            <img alt="submit-button" src="${checkSubmit}" />
                        </button>`;

    form.insertAdjacentHTML('beforeend', dateInput);
    form.insertAdjacentHTML('beforeend', categoryInput);
    form.insertAdjacentHTML('beforeend', contentsInput);
    form.insertAdjacentHTML('beforeend', paymentMethodInput);
    form.insertAdjacentHTML('beforeend', priceInput);
    form.insertAdjacentHTML('beforeend', buttonWrap);

    this.setEvents(form);
    this.setTemplate(form);

    return this.templateContent();
  }

  setEvents(form) {
    this.form = form;
    form.addEventListener('pointerdown', this.handleFormPointerDown);
    form.querySelector('#input-bar-date').addEventListener('click', this.handleDateClick);
    form.querySelector('#date-picker').addEventListener('change', this.handleDateChange);

    form.querySelectorAll('input[name=category]').forEach(item => {
      item.addEventListener('change', this.handleCategoryChange);
    });

    form.querySelectorAll('input[name=payment-method]').forEach(item => {
      item.addEventListener('change', this.handlePaymentMethodChange);
    });

    form.querySelector('#payment-method-add-button').addEventListener('click', this.handlePaymentMethodAddClick);

    form.querySelector('#input-bar-price').addEventListener('input', this.handlePriceChange);
  }

  handleFormPointerDown = evt => {
    const form = this.form;
    const selectBox = evt.target.closest('.select-box');
    const isSelectBoxClicked = selectBox && selectBox.contains(evt.target);

    if (!isSelectBoxClicked) {
      const checkboxes = form.querySelectorAll('input[type=checkbox]');
      checkboxes.forEach(checkbox => (checkbox.checked = false));
    }
  };

  handleDateClick = () => {
    const datePicker = this.form.querySelector('#date-picker');
    datePicker.showPicker();
  };

  handleDateChange = evt => {
    const date = evt.target.value;
    const dateInput = this.form.querySelector('#input-bar-date');

    dateInput.value = date;
  };

  handleCategoryChange = evt => {
    const value = evt.currentTarget.value;
    const text = this.form.querySelector('.category-text');
    const categoryCheckbox = this.form.querySelector('#category-checkbox');
    const plusIcon = this.form.querySelector('.plus-icon-wrap');
    const minusIcon = this.form.querySelector('.minus-icon-wrap');

    text.innerText = value;
    categoryCheckbox.checked = false;

    const isIncomeCategory = ['월급', '용돈', '기타수입'].includes(value);

    if (isIncomeCategory) {
      plusIcon.classList.remove('hidden');
      minusIcon.classList.add('hidden');
    } else {
      plusIcon.classList.add('hidden');
      minusIcon.classList.remove('hidden');
    }
  };

  handlePaymentMethodChange = evt => {
    const value = evt.currentTarget.value;
    const text = this.form.querySelector('.payment-method-text');
    const paymentMethodCheckbox = this.form.querySelector('#payment-mothod-checkbox');

    text.innerText = value;
    paymentMethodCheckbox.checked = false;
  };

  handlePaymentMethodAddClick = evt => {
    const paymentMethodCheckbox = this.form.querySelector('#payment-mothod-checkbox');
    paymentMethodCheckbox.checked = false;

    const confirmCallback = () => modal.clear();
    const cancelCallback = () => modal.clear();
    modal.input('추가하실 결제수단을 적어주세요.', confirmCallback, cancelCallback);
  };

  handlePriceChange = evt => {
    const input = evt.currentTarget;

    input.value = Number(input.value.replace(/[^0-9]/g, '').slice(0, 10)).toLocaleString();
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
  };
}
