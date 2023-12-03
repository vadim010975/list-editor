export default class Product {
  constructor(name, price) {
    this._name = name;
    this._price = price;
    this.element = document.createElement("div");
    this.element.classList.add("list-item");
    this.element.id = name;
    this.element.innerHTML = `
    <div class="list-item-column name">${this._name}</div>
    <div class="list-item-column price">${this._price}</div>`;
    const listItemEl = document.createElement("div");
    listItemEl.classList.add("list-item-column", "icons");
    this.buttonEdit = document.createElement("button");
    this.buttonEdit.classList.add("btn-icon", "edit");
    this.editHandler = null;
    this.onClickButtonEdit = this.onClickButtonEdit.bind(this);
    this.buttonEdit.addEventListener("click", this.onClickButtonEdit);
    listItemEl.appendChild(this.buttonEdit);
    this.buttonRemove = document.createElement("button");
    this.buttonRemove.classList.add("btn-icon", "remove");
    this.onClickButtonRemove = this.onClickButtonRemove.bind(this);
    this.buttonRemove.addEventListener("click", this.onClickButtonRemove);
    listItemEl.appendChild(this.buttonRemove);
    this.element.appendChild(listItemEl);
  }

  onClickButtonEdit(e) {
    e.preventDefault();
    this.editHandler(this);
  }

  onClickButtonRemove(e) {
    e.preventDefault();
    this.removeHandler(this);
  }

  set name(value) {
    this._name = value;
    this.element.id = value;
    this.element.querySelector(".name").textContent = value;
  }

  get name() {
    return this._name;
  }

  set price(value) {
    this._price = value;
    this.element.querySelector(".price").textContent = value;
  }

  get price() {
    return this._price;
  }
}
