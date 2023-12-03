import Product from './Product';
import Tooltip from './Tooltip';
import errors from './errors'

export default class Popup {
  constructor() {
    this.formEl = document.forms.popup;
    this.inputNameEl = this.formEl.elements.productName;
    this.inputPriceEl = this.formEl.elements.productPrice;
    this.onSubmit = this.onSubmit.bind(this);
    this.formEl.addEventListener('submit', this.onSubmit);
    this.btnCancelEl = this.formEl.querySelector('.cancel');
    this.onClickCancel = this.onClickCancel.bind(this);
    this.btnCancelEl.addEventListener('click', this.onClickCancel);
    this.showTooltip = this.showTooltip.bind(this);
    this.getError = this.getError.bind(this);
    this.errors = errors;
    this.tooltipFactory = new Tooltip();
    this.actualMessages = [];
    [...this.formEl.elements].forEach(el => el.addEventListener('focus', () => {
      el.addEventListener('blur', this.elementOnBlur);
    }));
  }

  onSubmit(e) {
    e.preventDefault();
    this.actualMessages.forEach((message) => this.tooltipFactory.removeTooltip(message.id));
    this.actualMessages = [];
    const elements = this.formEl.elements;
    if (![...elements].some(elem => {
      const error = this.getError(elem);

      if (error) {
        this.showTooltip(error, elem);
        return true;
      };

    })) {
      if (!this.product) {
        this.product = new Product(this.inputNameEl.value, +this.inputPriceEl.value);
      }
      if (this.product.name !== this.inputNameEl.value || this.product.price !== this.inputPriceEl.value) {
        if (this.product.name !== this.inputNameEl.value) {
          this.product.name = this.inputNameEl.value
        }
        if (this.product.price !== this.inputPriceEl.value) {
          this.product.price = +this.inputPriceEl.value
        }
        this.onSubmitHandler(this.product);
      }
      this.hide();
    }
  }

  onClickCancel(e) {
    e.preventDefault();
    this.actualMessages.forEach((message) => this.tooltipFactory.removeTooltip(message.id));
    this.actualMessages = [];
    this.hide();
  }

  show(product = null) {
    this.product = product;
    this.inputNameEl.value = product ? product.name : '';
    this.inputPriceEl.value = product ? product.price : '';
    this.formEl.classList.remove('hidden');
  }

  hide() {
    this.product = null;
    this.inputNameEl.value = '';
    this.inputPriceEl.value = '';
    this.formEl.classList.add('hidden');
  }

  showTooltip(message, el) {
    this.actualMessages.push({
      name: el.name,
      id: this.tooltipFactory.showTooltip(message, el)
    });
  }

  getError(el) {
    const errorKey = Object.keys(ValidityState.prototype).find((key) => {
      if (!el.name) return;
      if (key === 'valid') return;
      return el.validity[key];
    });
    if (!errorKey) return;
    return this.errors[el.name][errorKey];
  };
}