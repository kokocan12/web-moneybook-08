import './modal.scss';

class Modal {
  constructor() {
    const popupContainer = document.createElement('div');
    popupContainer.setAttribute('id', 'popup-container');

    this.popupContainer = popupContainer;

    document.body.appendChild(popupContainer);
  }

  /**
   * @returns {HTMLElement}
   */
  getDim() {
    this.disableScroll();
    const dim = document.createElement('div');
    dim.classList.add('dim');

    return dim;
  }

  /**
   * @returns {HTMLElement}
   */
  getModalBox() {
    const modalbox = document.createElement('div');
    modalbox.classList.add('modal-box');

    return modalbox;
  }

  /**
   *
   * @param {string} text
   */
  getTitle(text) {
    const titleBox = document.createElement('div');
    const title = document.createElement('h1');
    title.innerText = text;

    titleBox.classList.add('title-box');
    title.classList.add('title');

    titleBox.appendChild(title);

    return titleBox;
  }

  getOneButton(onClick = () => {}) {
    const confirm = '확인';
    const buttonBox = document.createElement('div');
    const button = document.createElement('button');

    buttonBox.classList.add('button-box');
    buttonBox.classList.add('center');
    button.classList.add('button');
    button.classList.add('confirm');
    button.innerText = confirm;

    button.addEventListener('click', onClick);
    buttonBox.append(button);

    return buttonBox;
  }

  getTwoButtons(onConfirmClick = () => {}, onCancelClick = () => {}) {
    const confirm = '확인';
    const cancel = '취소';
    const buttonBox = document.createElement('div');
    const confirmButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    buttonBox.classList.add('button-box');
    confirmButton.classList.add('button');
    cancelButton.classList.add('button');
    confirmButton.classList.add('confirm');
    cancelButton.classList.add('cancel');
    confirmButton.innerText = confirm;
    cancelButton.innerText = cancel;

    confirmButton.addEventListener('click', onConfirmClick);
    cancelButton.addEventListener('click', onCancelClick);
    buttonBox.append(cancelButton, confirmButton);

    return buttonBox;
  }

  getInput() {
    const inputBox = document.createElement('div');
    const input = document.createElement('input');
    inputBox.classList.add('input-box');
    input.classList.add('input');
    input.placeholder = '입력하세요';

    inputBox.appendChild(input);

    return inputBox;
  }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  ableScroll() {
    document.body.style.overflow = '';
  }

  clear = () => {
    const popupContainer = this.popupContainer;

    while (popupContainer.children.length) {
      popupContainer.removeChild(popupContainer.children[0]);
    }

    this.ableScroll();
  };

  /**
   *
   * @param {string} text
   * @param {Function} callback
   */
  alert(text, callback) {
    const dim = this.getDim();
    const modalbox = this.getModalBox();
    const title = this.getTitle(text);
    const button = this.getOneButton(callback);

    modalbox.append(title, button);

    this.popupContainer.append(dim, modalbox);
  }

  /**
   *
   * @param {string} text
   * @param {Function} callback
   */
  confirm(text, confirmCallback, cancelCallback) {
    const dim = this.getDim();
    const modalbox = this.getModalBox();
    const title = this.getTitle(text);
    const button = this.getTwoButtons(confirmCallback, cancelCallback);

    modalbox.append(title, button);

    this.popupContainer.append(dim, modalbox);
  }

  /**
   *
   * @param {string} text
   * @param {Function} callback
   */
  input(text, confirmCallback, cancelCallback) {
    const dim = this.getDim();
    const modalbox = this.getModalBox();
    const title = this.getTitle(text);
    const input = this.getInput();
    const button = this.getTwoButtons(confirmCallback.bind(null, input.querySelector('input')), cancelCallback);

    modalbox.append(title, input, button);

    this.popupContainer.append(dim, modalbox);
  }
}

const modal = new Modal();
export { modal };
