const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
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

  if(!users.isValidUsername(username)) {
    console.log(username);
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username.toLowerCase() === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie('sid', sid);
  res.json({ username });
});

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

// Stored Word
app.get('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const storedWord = users.wordFor[username] || "";

  res.json( storedWord );
});

// Change Word
app.post('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { word } = req.body;

  if(!word && word === '') {
    res.status(400).json({ error: 'required-word' });
    return;
  }

  if(!users.isValidWord(word)) {
    res.status(400).json({ error: 'invalid-word' });
    return;
  }

  users.wordFor[username] = word;

  res.json( word );
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

