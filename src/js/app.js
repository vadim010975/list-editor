import ProductList from "./ProductList";
import Popup from "./Popup";

const container = document.querySelector('.list-items');

const popup = new Popup();

const productList = new ProductList(container, popup);

productList.init();
