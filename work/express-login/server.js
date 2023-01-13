const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;
const homeWeb = require('./home-web');

app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./public'));

//check if the username is valid or not
const checkUsername = function(username) {
    const errors = [];
    const text = username.replace(/[^a-z0-9]/gi, '');

    if(text === 'dog') {
        errors.push('Please use other username.');
    }
    if (text !== username) {
        errors.push('Username only contains letters and numbers.');
    }
    if (!username) {
        errors.push('Empty Username!');
    }
    return errors.length ? errors : '';
}

//home page
app.get("/", (req, res) => {
    const { sid }= req.cookies;

    if(sid && sessions[sid]) {
        const { username }= sessions[sid];
        if(!storedData[username]) {
            storedData[username] = {word: ''};
        }
        res.send(homeWeb.dataPage(username, storedData[username].word));
        return;
    }
    res.send(homeWeb.login());
});

const sessions = {};
const storedData = {};

//login page
app.post('/login', (req, res) => {
    const { username }= req.body;
    const errors = checkUsername(username);

    if(errors){
        res.status(401).send(homeWeb.loginFailed(errors));
        return;
    }
  
    const sid = uuid();
    sessions[sid] = { username };

    res.cookie('sid', sid);
    res.redirect('/');
});

//change word
app.post('/change', (req, res) => {
    const { word } = req.body;
    const { sid } = req.cookies;
    const { username } = sessions[sid];
    storedData[username] = { word };

    res.redirect('/');
});

//logout
app.post('/logout', (req, res) => {
    const { sid }= req.cookies;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));