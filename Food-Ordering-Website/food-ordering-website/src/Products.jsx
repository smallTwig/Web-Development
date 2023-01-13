
function Products( { 
  products, 
  onAddToCart, 
  onTotalPrice, 
  onTotalQuantities 
}){
  return (
  <div className="food-container">
    {products.map( product => {
        return(
          <div className="product" key={product.id} data-id={product.id}>
            <div className="product-detail">
              <img className="product-img" src={product.img}/>
              <div>{product.name}</div>
              <div>
                <div className="product-category">{product.category} </div>
                <div className="product-price">${product.price}</div>
              </div>
              <button 
                type="submit" 
                className="add-cart-button button"
                data-id={product.id}
                onClick={ (e) => {
                  const id = e.target.dataset.id;
                  onAddToCart(id);
                  onTotalPrice();
                  onTotalQuantities();
                }}
              >Add to Cart</button>
            </div>
          </div>
        ) 
    })} 
  </div>
  )
};

export default Products;