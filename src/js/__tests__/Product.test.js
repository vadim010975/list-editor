/**
 * @jest-environment jsdom
 */

import Product from "../Product";

test("testing class Product", () => {
    document.documentElement.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div class="page">
      </div>
    </body>
    </html>`;

  const product = new Product('phone', 10000);
  const container = document.querySelector(".page");
  container.appendChild(product.element);
  let result = document.querySelector("#phone").querySelector('.name').textContent;
  expect(result).toBe('phone');
  result = document.querySelector("#phone").querySelector('.price').textContent;
  expect(result).toBe("10000");
  }
);
