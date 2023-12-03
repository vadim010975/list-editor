import data from './data';

export default class ProductList {
  constructor(containerEl, popup) {
    this.containerEl = containerEl;
    this.addProduct = this.addProduct.bind(this);
    this.popup = popup;
    this.popup.onSubmitHandler = this.addProduct;
    this.products = data;
    this.removeProduct = this.removeProduct.bind(this);
    this.confirmDeletion = this.confirmDeletion.bind(this);
    this.addEl = document.querySelector('.plus');
    this.onClickAdd = this.onClickAdd.bind(this);
    this.addEl.addEventListener('click', this.onClickAdd);
    this.editProduct = this.editProduct.bind(this);
    this.confirmEl = document.querySelector('.confirm');
  }

  init() {
    this.products.forEach(product => this.initProduct(product));
    this.renderProducts();
  }

  initProduct(product) {
    product.removeHandler = this.confirmDeletion;
    product.editHandler = this.editProduct;
  }

  renderProduct(product) {
    this.containerEl.appendChild(product.element);
  }

  renderProducts() {
    this.clear();
    this.products.forEach(product => {
      this.renderProduct(product);
    });
  }

  clear() {
    [...this.containerEl.children].forEach(el => el.remove());
  }

  removeProduct(product) {
    this.products = this.products.filter(element => element !== product);
    this.renderProducts();
  }

  confirmDeletion(product) {
    const { bottom } = product.element.getBoundingClientRect();
    this.confirmEl.classList.remove('hidden');
    this.confirmEl.style.top = bottom + 'px';
    this.confirmEl.querySelector('.yes').onclick = () => {
      this.removeProduct(product);
      this.confirmEl.classList.add('hidden');
    };
    this.confirmEl.querySelector('.no').onclick = () => {
      this.confirmEl.classList.add('hidden');
    };
  }

  editProduct(product) {
    this.popup.show(product);
  }

  addProduct(product) {
    const editableProduct = this.products.find(el => product.name === el.name);
    if (editableProduct) {
      editableProduct.price = product.price;
      this.renderProducts();
      return;
    }
    this.initProduct(product);
    this.products.push(product);
    this.renderProducts();
  }

  onClickAdd(e) {
    e.preventDefault();
    this.popup.show();
  }
}