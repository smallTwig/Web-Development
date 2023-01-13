"use strict"

const products = require('./products');

function makeCart() {

  const cart = {};
  let cartItems = {
    // ["4"]: {
    //   id: "4",
    //   item: 'Ramen', 
    //   price: 13.99,
    //   quantity: 1 
    // }
  };

  cart.contains = function contains(id){
    return !!cartItems[id];
  }

  cart.getCartItems = function getCartItems() {
    return cartItems;
  }

  cart.addCartItem = function addCartItem(id) {
    const product = products.getProduct(id);
    if (cart.contains(id)){
      cartItems[id].quantity++;
    }else {
      cartItems[id] = {
        id: id,
        item: product.name,
        price: product.price,
        quantity: 1
      };
    }
    return id;
  }

  cart.getCartItem = function getCartItem(id) {
    return cartItems[id];
  }

  cart.updateAddItem = function updateAddItem(id) {
    cartItems[id].quantity++;
  }

  cart.updateMinusItem = function updateMinusItem(id){
    if (cartItems[id].quantity === 1){
      cart.deleteItem(id);
      return
    }
    cartItems[id].quantity--;
  }

  cart.deleteItem = function deleteItem(id) {
    delete cartItems[id];
  }

  cart.getTotalQuantities = function getTotalQuantities(){
    let count = 0;
    if (cartItems){
      for (const i in cartItems){
        count += cartItems[i].quantity;
      }
    }
    return count;
  }

  cart.totalPrice = function totalPrice() {
    let total = 0;
    if (cartItems){
      for (const i in cartItems){
        total += cartItems[i].price * cartItems[i].quantity;
      }
    }
    return Number.parseFloat(total).toFixed(2);
  }

  cart.deleteAllItems = function deleteAllItems(){
    cartItems = {};
  }

  return cart;
}

module.exports = {
  makeCart,
};