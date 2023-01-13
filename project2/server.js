const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const messages = require('./messages');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

//Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)){
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

//Login
app.post('/api/session', (req, res) => {
  const username = req.body.username;

  if(!users.isValid(username)){
    res.status(400).json({ error: 'required-username'});
    return;
  }

  if(username === 'dog'){
    res.status(403).json({ error: 'auth-insufficient'});
    return;
  }
  const sid = sessions.addSession(username);

  res.cookie('sid', sid);
  res.json( messages.getAllMessages() );
});

//Logout
app.delete('/api/session', (req,res) => {
  const sid = req.body.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid){
    res.clearCookie('sid');
  }

  if(username){
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

//Get all users
app.get('/api/users', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)){
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const usernames = sessions.getAllUsernames(sessions.sessions);

  res.json( usernames );
});

//Get all messages
app.get('/api/messages', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)){
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json( messages.getAllMessages() );
});

//Send a message
app.post('/api/messages', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  const message = req.body.message;

  if(!message && message !== '') {
    res.status(400).json({ error: 'required-message' });
    return;
  }

  messages.addMessage({ username, message });

  res.json( messages.getAllMessages() );
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));