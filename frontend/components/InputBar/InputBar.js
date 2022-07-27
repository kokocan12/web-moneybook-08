import { Component } from '../Component.js';
import { modal } from '../Modal/Modal.js';
import './inputbar.scss';
import checkSubmit from '../../assets/icons/check-submit.svg';
import downArrow from '../../assets/icons/down-arrow.svg';
import deleteIcon from '../../assets/icons/delete-icon.svg';
import minusIcon from '../../assets/icons/minus-icon.svg';

export class InputBar extends Component {
  /*
  category:
  {
    "id": number,
    "name_en": string,
    "name_ko": string,
    "type": "O"|"I"
  }
  categories:Array<category>
  ----------------------------------
  paymentType:
  {
    "id": number,
    "name": string
  }
  paymentTypes:Array<paymentType>
  */
  constructor({ state, setState }) {
    super();
    this.categories = state.categories;
    this.paymentTypes = state.paymentTypes;
    this.state = state.inputBar;
    this.setState = newState => {
      setState({ inputBar: { ...this.state, ...newState } });
    };
  }
  render() {
    const form = document.createElement('form');
    form.classList.add('input-bar-form');

    const { currentDate, category, categoryName, title, paymentType, paymentTypeName, amount } = this.state;

    const dateInput = ` <div class="input-wrap">
                            <label class="item-label" for="input-bar-date">
                                일자
                            </label>
                            <input id="input-bar-date" class="input" type="text" readonly placeholder="입력하세요" autocomplete="off" value="${currentDate}" />
                            <input id="date-picker" class="input" type="date" value="${currentDate}"  />
                        </div>`;

    const categoryInput = ` <div class="input-wrap">
                                <label class="item-label" for="category-checkbox">
                                    분류
                                </label>
                                <input class="hidden" type="checkbox" id="category-checkbox" />
                                <label class="select-indicator" for="category-checkbox">
                                    <span class="select-indicator--text category-text">${
                                      categoryName ? categoryName : '선택하세요'
                                    }</span>
                                    <img src="${downArrow}" />
                                </label>
                                <label class="select-box">
                                    <ul class="radio-wrap">
                                        ${this.categories
                                          .map(categoryItem => {
                                            return `<li class="radio-item">
                                                        <label class="label" for="category-${categoryItem.id}">${categoryItem.name_ko}</label>
                                                    </li>`;
                                          })
                                          .join('')}
                                    </ul>
                                    <div class="select">
                                        ${this.categories
                                          .map(categoryItem => {
                                            return `<input type="radio" name="category" 
                                            ${categoryItem.id === category ? 'checked' : ''}
                                            value="${categoryItem.id}" id="category-${categoryItem.id}" />`;
                                          })
                                          .join('')}
                                    </div>
                                </label>
                            </div>`;

    const contentsInput = ` <div class="input-wrap">
                                <label class="item-label" for="input-bar-contents">
                                    내용
                                </label>
                                <input id="input-bar-contents" class="input" type="text" value="${title}" placeholder="입력하세요" autocomplete="off" />
                            </div>`;

    const paymentTypeInput = `<div class="input-wrap">
                                    <label class="item-label" for="payment-mothod-checkbox">
                                        결제수단
                                    </label>
                                    <input class="hidden" type="checkbox" id="payment-mothod-checkbox" />
                                    <label class="select-indicator" for="payment-mothod-checkbox">
                                        <span class="select-indicator--text payment-method-text">${
                                          paymentTypeName ? paymentTypeName : '선택하세요'
                                        }</span>
                                        <img src="${downArrow}" />
                                    </label>
                                    <label class="select-box" for="payment-mothod-checkbox">
                                        <ul class="radio-wrap">
                                            ${this.paymentTypes
                                              .map(paymentTypeItem => {
                                                return `<li class="radio-item">
                                                            <label class="label" for="payment-type-${paymentTypeItem.id}">
                                                                <div class="radio-item--container">
                                                                    <span class="radio-item--container--text">${paymentTypeItem.name}</span>
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
                                            ${this.paymentTypes
                                              .map(paymentTypeItem => {
                                                return `<input type="radio" name="payment-method" 
                                                ${paymentTypeItem.id === paymentType ? 'checked' : ''}
                                                 value="${paymentTypeItem.id}" 
                                                 id="payment-type-${paymentTypeItem.id}" />`;
                                              })
                                              .join('')}
                                        </div>
                                    </label>
                                </div>`;

    const amountInput = `<div class="input-wrap">
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
                                <input id="input-bar-price" class="input" type="text" placeholder="입력하세요" value="${
                                  amount ? Math.abs(amount).toLocaleString() : ''
                                }" autocomplete="off" />
                                <span class="price-unit">원</span>
                            </div>
                        </div>`;

    const buttonWrap = `<button class="submit-button">
                            <img alt="submit-button" src="${checkSubmit}" />
                        </button>`;

    form.insertAdjacentHTML('beforeend', dateInput);
    form.insertAdjacentHTML('beforeend', categoryInput);
    form.insertAdjacentHTML('beforeend', contentsInput);
    form.insertAdjacentHTML('beforeend', paymentTypeInput);
    form.insertAdjacentHTML('beforeend', amountInput);
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

    form.querySelector('#input-bar-contents').addEventListener('input', this.handleTitleChange);

    form.querySelectorAll('input[name=payment-method]').forEach(item => {
      item.addEventListener('change', this.handlePaymentTypeChange);
    });

    form.querySelector('#payment-method-add-button').addEventListener('click', this.handlePaymentTypeAddClick);

    form.querySelector('#input-bar-price').addEventListener('input', this.handleAmountChange);
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
    this.setState({ currentDate: date });
  };

  handleCategoryChange = evt => {
    const value = evt.currentTarget.value;
    const text = this.form.querySelector('.category-text');
    const categoryCheckbox = this.form.querySelector('#category-checkbox');
    const plusIcon = this.form.querySelector('.plus-icon-wrap');
    const minusIcon = this.form.querySelector('.minus-icon-wrap');

    categoryCheckbox.checked = false;
    const selectCategory = this.categories.find(item => item.id === +value);
    text.innerText = selectCategory.name_ko;

    this.setState({ category: +value, categoryName: selectCategory.name_ko });

    const isIncomeCategory = selectCategory.type === 'I';
    if (isIncomeCategory) {
      plusIcon.classList.remove('hidden');
      minusIcon.classList.add('hidden');
    } else {
      plusIcon.classList.add('hidden');
      minusIcon.classList.remove('hidden');
    }
  };

  handleTitleChange = evt => {
    const value = evt.target.value;

    this.setState({ title: value });
  };

  handlePaymentTypeChange = evt => {
    const value = evt.currentTarget.value;
    const text = this.form.querySelector('.payment-method-text');
    const paymentMethodCheckbox = this.form.querySelector('#payment-mothod-checkbox');

    const selectPaymentType = this.paymentTypes.find(item => item.id === +value);
    text.innerText = selectPaymentType.name;

    this.setState({ paymentType: +value, paymentTypeName: selectPaymentType.name });
    paymentMethodCheckbox.checked = false;
  };

  handlePaymentTypeAddClick = evt => {
    const paymentMethodCheckbox = this.form.querySelector('#payment-mothod-checkbox');
    paymentMethodCheckbox.checked = false;

    const confirmCallback = () => modal.clear();
    const cancelCallback = () => modal.clear();
    modal.input('추가하실 결제수단을 적어주세요.', confirmCallback, cancelCallback);
  };

  handleAmountChange = evt => {
    const input = evt.currentTarget;

    input.value = Number(input.value.replace(/[^0-9]/g, '').slice(0, 10)).toLocaleString();

    this.setState({ amount: input.value.replace(/,/g, '') });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
  };
}
