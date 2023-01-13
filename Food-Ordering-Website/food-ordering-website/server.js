const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const cart = require('./cart');
const products = require('./products');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Check session
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

// Create a new session (login)
app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    console.log(username);
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username.toLowerCase() === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, cart.makeCart());
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username).getCartItems());
});

// Delete session logout
app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }

  res.json({ wasLoggedIn: !!username }); 
});

// Get all products
app.get('/api/products', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json( products.getAllProducts() );
});

// Get cart items
app.get('/api/cartItems', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json( users.getUserData(username).getCartItems());
});

// Add to cart
app.post('/api/cartItems', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const id= req.body.id;

  const cart = users.getUserData(username);
  cart.addCartItem(id);
  
  console.log("new item is " + cart.getCartItem(id).item);
  res.json(cart.getCartItem(id));
});

// Update cart item
app.patch('/api/cartItems/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id, action } = req.body;
  const cart = users.getUserData(username);
  if(!cart.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No item with id ${id}` });
    return;
  }

  if (action === "minus"){
    cart.updateMinusItem(id);
  }else if (action === "plus"){
    cart.updateAddItem(id);
  }

  res.json(cart.getCartItems());
});

// Delete cart item
app.delete('/api/cartItems/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const cart = users.getUserData(username);
  const exists = cart.contains(id);
  if(exists) {
    cart.deleteItem(id);
  }

  res.json({ message: exists ? `cart ${id} deleted` : `cart ${id} did not exist` })
});

app.get('/api/totalPrice', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const cart = users.getUserData(username);
  res.json( cart.totalPrice() );
});

app.get('/api/totalQuantities', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const cart = users.getUserData(username);
  res.json( cart.getTotalQuantities() );
});

app.delete('/api/cartItems', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const cart = users.getUserData(username);
  cart.deleteAllItems();

  res.json( cart.getCartItems() )
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));