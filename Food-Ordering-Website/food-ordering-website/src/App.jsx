import { useState, useEffect } from 'react';
import './app.css';

import {
    LOGIN_STATUS,
    CLIENT,
    SERVER,
} from './constants';
import {
    fetchSession,
    fetchLogin,
    fetchLogout,
    fetchAllProducts,
    fetchCartItems,
    fetchAddToCart,
    fetchDeleteCartItem,
    fetchUpdatecartItems,
    fetchTotalPrice,
    fetchDeleteCartItems,
    fetchTotalQuantities,
  } from './services';

import LoginForm from './LoginForm';
import Status from './Status';
import Loading from './Loading';
import Controls from './Controls';
import Products from './Products';
import Cart from './Cart';

function App() {
  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); 
  const [ products, setProducts ] = useState([]);
  const [ cartItems, setCartItems ] = useState({});
  const [ totalPrice, setTotalPrice ] = useState('');
  const [ totalQuantities, setTotalQuantities ] = useState('');

  function onLogin( username ) {
    fetchLogin(username)
    .then( cartItems => {
      setError(''); 
      setUsername(username);
      setCartItems(cartItems);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      return fetchAllProducts();
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    })
    .then( products => {
        setProducts(products);
    })
    .catch( err => {
        setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setProducts([]);
    setCartItems({});
    setTotalPrice('');
    setTotalQuantities('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onAddToCart(id) {
    setError(''); 
    checkForSession();
    fetchAddToCart(id)
    .then( newItem => {
        setCartItems({
            ...cartItems,
            [newItem.id]: newItem,
        });
    })
    .catch( err => {
        setError(err?.error || 'ERROR');
    })
    
  }

  function onPlusItem(id, action) {
    setError(''); 
    checkForSession();
    fetchUpdatecartItems(id, action)
    .then( cartItems => {
        setCartItems(cartItems);
    })
    .catch( err => {
        setError(err?.error || 'ERROR'); 
    });
  }

  function onMinusItem(id, action) {
    setError(''); 
    checkForSession();
    fetchUpdatecartItems(id, action)
    .then( cartItems => {
        setCartItems(cartItems);
    })
    .catch( err => {
        setError(err?.error || 'ERROR'); 
    });

  }

  function onDeleteItem(id) {
    setError(''); 
    checkForSession();
    fetchDeleteCartItem(id)
    .then( () => {
        return fetchCartItems();
    })
    .catch( err => {
        setError(err?.error || 'ERROR'); 
    })
    .then( cartItems => {
        setCartItems(cartItems);
    })
    .catch( err => {
        setError(err?.error || 'ERROR'); 
    });
  }

  function onTotalPrice(){
    setError(''); 
    fetchTotalPrice()
    .then(totalPrice => {
      setTotalPrice(totalPrice);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
  });
  }

  function onTotalQuantities(){
    setError(''); 
    fetchTotalQuantities()
    .then(totalQuantities => {
      setTotalQuantities(totalQuantities);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
  });
  }

  function onCheckout(){
    setError('');
    fetchDeleteCartItems()
    .then(cartItems => {
      setCartItems(cartItems);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
  });
  }

  function checkForSession() {
    setError(''); 
    fetchSession()
    .then( session => { 
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); 
      return fetchAllProducts(); 
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err); 
    })
    .then( products => {
        setProducts(products);
      return fetchCartItems();
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    })
    .then( cartItems => {
        setCartItems(cartItems);
    })
    .catch( err => {
        setError(err?.error || 'ERROR');
    });
  }

  useEffect(
    () => {
      checkForSession();
    },
    [] 
  );

  return (
    <div className="app">
      <div>
        <div className="status">
          { error && <Status error={error}/> }
        </div>

        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <div className="container grid">
      
          <div className="info">
              <div> <p>Hello, {username}</p> </div>
              <div> <Controls onLogout={onLogout} /> </div>
          </div>

          <div className="foods">
          <Products 
          products={products} 
          onAddToCart={onAddToCart}
          onTotalPrice={onTotalPrice}
          onTotalQuantities={onTotalQuantities}/>
          </div>

          <div className="cart"> 
          <Cart 
          cartItems={cartItems} 
          onPlusItem={onPlusItem} 
          onMinusItem={onMinusItem} 
          onDeleteItem={onDeleteItem}
          onTotalPrice={onTotalPrice}
          onTotalQuantities={onTotalQuantities}
          totalPrice={totalPrice}
          totalQuantities={totalQuantities}
          onCheckout={onCheckout}/>
          </div>
      </div>
      )}
    </div>
  </div>
  );
}

export default App;
