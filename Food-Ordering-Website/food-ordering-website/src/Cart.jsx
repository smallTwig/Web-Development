function Cart({
  cartItems, 
  onPlusItem, 
  onMinusItem, 
  onDeleteItem, 
  onTotalPrice,
  onTotalQuantities,
  totalPrice,
  totalQuantities, 
  onCheckout
}){ 
  return (
    <div className="cart">
      <div className="cart-label"> Your Cart has ({totalQuantities}) items : </div>
      <div className="cart-content">
      { Object.values(cartItems).map ( item => (
        <div className="cart-item" data-id={item.id}>
          <div className="cart-name-price">
            <span> {item.item}     </span>
            <span> ${item.price}/per</span>
          </div>
          <div classNmae="cart-buttons">
            <button 
            className="minus-button button"
            type="submit" 
            data-id={item.id}
            data-action="minus"
            onClick={ (e) => {
              const id = e.target.dataset.id;
              const action = e.target.dataset.action;
              onMinusItem(id, action);
              onTotalPrice();
              onTotalQuantities();
            }}
            >-</button>
            
            <span> {item.quantity}</span>

            <button  
            className="plus-button button"
            type="submit" 
            data-id={item.id}
            data-action="plus"
            onClick={ (e) => {
              const id = e.target.dataset.id;
              const action = e.target.dataset.action;
              onPlusItem(id, action);
              onTotalPrice();
              onTotalQuantities();
            }}
            >+</button>
            
            <button
            className="delete-button button"
            type="submit" 
            data-id={item.id}
            onClick={ (e) => {
              const id = e.target.dataset.id;
              onDeleteItem(id);
              onTotalPrice();
              onTotalQuantities();
            }}
            >x</button>
          </div>
        </div>
      ))}
      </div>
      <div className="price-checkout">
      <div className="total-price"> Total Price:  ${totalPrice} </div>
      <button 
        className="checkout-button button"
        type="submit"
        onClick={ (e) => {
        onCheckout();
        onTotalPrice();
        onTotalQuantities();
      }}>
        Checkout
      </button>
      </div>
    </div>
  )
};

export default Cart;