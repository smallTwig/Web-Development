/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/shop.js ***!
  \*********************/


var cart = [{
  item: 'mickey',
  price: 0.99,
  quantity: 1,
  img: 1
}];
var appEl = document.querySelector('#app');
var viewCartEl = document.querySelector('#view-cart');
var cartItems = document.querySelector('#view-cart .cartItems');
var substractButton = document.querySelector('#view-cart .substract');
var viewButton = document.querySelector('#view-cart .view-cart-button-div');

// add the cat to cart
appEl.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-cart-button')) {
    if (cart.length === 0) {
      document.querySelector('#view-cart .empty-cart').classList.add('no-display');
    }
    var itemName = String(event.target.dataset.name);
    var itemPrice = parseFloat(event.target.dataset.price);
    var itemImg = parseInt(event.target.dataset.img);
    if (cart.find(function (e) {
      return e.item === itemName;
    })) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].item === itemName) {
          cart[i].quantity++;
        }
      }
    } else {
      var newItem = {
        item: itemName,
        price: itemPrice,
        quantity: 1,
        img: itemImg
      };
      cart.push(newItem);
    }
    renderViewButton(cart);
    renderCart(cart);
  }
});

// click view button to view cart, click hide cart to see view button
viewCartEl.addEventListener('click', function (event) {
  if (event.target.classList.contains('view-cart-button')) {
    if (cart.length === 0) {
      document.querySelector('#view-cart .empty-cart').classList.remove('no-display');
    } else {
      document.querySelector('#view-cart .view-cart-button-div').classList.add('no-display');
      document.querySelector('#view-cart .cart-part').classList.remove('no-display');
    }
  }
  if (event.target.classList.contains('hide-cart')) {
    document.querySelector('#view-cart .view-cart-button-div').classList.remove('no-display');
    document.querySelector('#view-cart .cart-part').classList.add('no-display');
  }
  renderViewButton(cart);
  renderCart(cart);
});

// add quantity
cartItems.addEventListener('click', function (event) {
  if (event.target.classList.contains('addition')) {
    var index = event.target.dataset.index;
    cart[index].quantity++;
    renderViewButton(cart);
    renderCart(cart);
  }
});

//minus quantity
cartItems.addEventListener('click', function (event) {
  if (event.target.classList.contains('substract')) {
    var index = event.target.dataset.index;
    if (cart[index].quantity === 1) {
      cart.splice(index, 1);
      renderViewButton(cart);
      renderCart(cart);
      return;
    }
    cart[index].quantity--;
    renderViewButton(cart);
    renderCart(cart);
  }
});

// remove item in cart
cartItems.addEventListener('click', function (event) {
  if (event.target.classList.contains('to-remove')) {
    var index = event.target.dataset.index;
    cart.splice(index, 1);
    renderViewButton(cart);
    renderCart(cart);
  }
});

//check out to remove all items
cartItems.addEventListener('click', function (event) {
  if (event.target.classList.contains('remove-all')) {
    cart = [];
    document.querySelector('#view-cart .cart-part').classList.add('no-display');
    document.querySelector('#view-cart .view-cart-button-div').classList.remove('no-display');
    renderViewButton(cart);
    renderCart(cart);
  }
});

//render cart item
function renderCart(cart) {
  var cartItem = cart.map(function (item, index) {
    return "\n    <li>\n      <div class=\"cart-item\">\n        <img src=\"http://placekitten.com/50/50?image=".concat(item.img, "\" alt=\"cat\">\n        <span class=\"item-name\" data-index=\"").concat(index, "\">").concat(item.item, "</span>\n        <span class=\"item-price\" data-index=\"").concat(index, "\">").concat(item.price, "</span>\n        <button class=\"substract\" data-index=\"").concat(index, "\"> - </button>\n        <span class=\"item-quantity\" data-index=\"").concat(index, "\">").concat(item.quantity, "</span>\n        <button class=\"addition\" data-index=\"").concat(index, "\"> + </button>\n        <button data-id=").concat(index, " class=\"to-remove\" type=\"button\">X</button>\n        \n      <div>\n    </li>\n  ");
  }).join('');
  var html = "\n    <ol>".concat(cartItem, "</ol>\n    <div>Total item: ").concat(getTotalItems(cart), "</div>\n    <div>Total Price: ").concat(getTotalPrices(cart), "</div>\n    <button class=\"remove-all\">CHECKOUT</button>\n  ");
  cartItems.innerHTML = html;
}

//render view cart button
function renderViewButton(cart) {
  var html = "\n    <button class=\"view-cart-button\" type=\"button\">View the Cart  (".concat(getTotalItems(cart), ")</button>\n  ");
  viewButton.innerHTML = html;
}

//get the total items
function getTotalItems(cart) {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].quantity;
  }
  return total;
}

//get the total prices
function getTotalPrices(cart) {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return Number.parseFloat(total).toFixed(2);
}
renderViewButton(cart);
renderCart(cart);
/******/ })()
;
//# sourceMappingURL=bundle.js.map