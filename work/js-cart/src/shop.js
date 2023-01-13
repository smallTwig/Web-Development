"use strict";

let cart = [
  {item: 'mickey', price: 0.99, quantity: 1, img: 1 }
];

const appEl = document.querySelector('#app');
const viewCartEl = document.querySelector('#view-cart');
const cartItems = document.querySelector('#view-cart .cartItems');
const substractButton = document.querySelector('#view-cart .substract');
const viewButton = document.querySelector('#view-cart .view-cart-button-div');

// add the cat to cart
appEl.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-cart-button')){
    if (cart.length === 0){
      document.querySelector('#view-cart .empty-cart').classList.add('no-display');
    }

    const itemName = String(event.target.dataset.name);
    const itemPrice = parseFloat(event.target.dataset.price);
    const itemImg = parseInt(event.target.dataset.img);
    
    if (cart.find(e => e.item === itemName)){
      for (let i = 0; i < cart.length; i++){
        if (cart[i].item === itemName){
          cart[i].quantity++;
        }
      }
    }else {
        const newItem = {
        item: itemName,
        price: itemPrice,
        quantity: 1,
        img: itemImg
      }
      cart.push(newItem);
    }
    renderViewButton(cart);
    renderCart(cart);
  }

})

// click view button to view cart, click hide cart to see view button
viewCartEl.addEventListener('click', (event) => {
  if (event.target.classList.contains('view-cart-button')){
    if (cart.length === 0){
      document.querySelector('#view-cart .empty-cart').classList.remove('no-display'); 
    }else {
      document.querySelector('#view-cart .view-cart-button-div').classList.add('no-display');
      document.querySelector('#view-cart .cart-part').classList.remove('no-display');
    }
  }

  if (event.target.classList.contains('hide-cart')){
    document.querySelector('#view-cart .view-cart-button-div').classList.remove('no-display');
    document.querySelector('#view-cart .cart-part').classList.add('no-display');
  }
  renderViewButton(cart);
  renderCart(cart);
})

// add quantity
cartItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('addition')) {
    const index = event.target.dataset.index;
    cart[index].quantity++;
    renderViewButton(cart);
    renderCart(cart);
  }
});

//minus quantity
cartItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('substract')) {
    const index = event.target.dataset.index;
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
cartItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('to-remove')) {
    const index = event.target.dataset.index;
    cart.splice(index, 1);
    renderViewButton(cart);
    renderCart(cart);
  }
});

//check out to remove all items
cartItems.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-all')) {
    cart = [];
    document.querySelector('#view-cart .cart-part').classList.add('no-display');
    document.querySelector('#view-cart .view-cart-button-div').classList.remove('no-display');
    renderViewButton(cart);
    renderCart(cart);
  }
});

//render cart item
function renderCart(cart){
  const cartItem = cart.map(( item, index ) => {
    return `
    <li>
      <div class="cart-item">
        <img src="http://placekitten.com/50/50?image=${item.img}" alt="cat">
        <span class="item-name" data-index="${index}">${item.item}</span>
        <span class="item-price" data-index="${index}">${item.price}</span>
        <button class="substract" data-index="${index}"> - </button>
        <span class="item-quantity" data-index="${index}">${item.quantity}</span>
        <button class="addition" data-index="${index}"> + </button>
        <button data-id=${index} class="to-remove" type="button">X</button>
        
      <div>
    </li>
  `;
  }).join('');

  const html = `
    <ol>${cartItem}</ol>
    <div>Total item: ${getTotalItems(cart)}</div>
    <div>Total Price: ${getTotalPrices(cart)}</div>
    <button class="remove-all">CHECKOUT</button>
  `
  cartItems.innerHTML = html;
}

//render view cart button
function renderViewButton(cart){
  const html = `
    <button class="view-cart-button" type="button">View the Cart  (${getTotalItems(cart)})</button>
  `
  viewButton.innerHTML = html;
}

//get the total items
function getTotalItems(cart){
    let total = 0;
    for (let i = 0; i < cart.length; i++){
        total += cart[i].quantity;
    }
    return total;
}

//get the total prices
function getTotalPrices(cart){
  let total = 0;
  for (let i = 0; i < cart.length; i++){
    total += cart[i].price * cart[i].quantity;
  }
  return Number.parseFloat(total).toFixed(2);
}

renderViewButton(cart);
renderCart(cart);