const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const webPage = require('./webPage');
const users = require('./users');
const words = require('./words')

const checkUsername = function (username) {
    const errors = [];
    const clean = username.replace(/[^a-z0-9]/gi, '');

    if(clean === 'dog') {
        errors.push('Please use other username.');
    }
    if (clean !== username) {
        errors.push('Username only contains letters and numbers.');
    }
    if (!username) {
        errors.push('Empty Username!');
    }
    return errors.length ? errors : '';
}

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('./public'));

const sessions = {};

//home page
app.get('/', (req, res) => {
    const { sid }= req.cookies;

    if(sid && sessions[sid]) {
        const { username }= sessions[sid];
        if(!users[username]) {
            users.newUser(username);
        }
        const { answer }= users[username];
        console.log(`username: ${username}, answer: ${answer}`);
        res.send(webPage.guessPage(username));
        return;
    }
    res.send(webPage.loginPage());
});

//login page
app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const errors = checkUsername(username);
    if(errors){
        res.status(401).send(webPage.loginFail(errors));
        return;
    }

    const sid = uuid();
    sessions[sid] = {username};

    res.cookie('sid', sid);
    res.redirect('/');
});

//guess and match word
app.post('/guess', express.urlencoded({ extended: false }), (req, res) => {
    let { guessedWord }= req.body;
    const { sid }= req.cookies;
    const { username }= sessions[sid];
    const { answer }= users[username];
    users[username].invalid = false;
 
    if (guessedWord === answer){
        res.redirect('/success');
    } else if (!guessedWord) {
        res.redirect('/');
    } else if (!words.includes(guessedWord)) {
        users[username].invalid = true;
        res.redirect('/');
    } else if (users[username].guessedLists[guessedWord]) {
        res.redirect('/');
    } else {
        const matched = webPage.matchLetters(username, guessedWord);
        users[username].guessedLists[guessedWord] = {
            matched: matched
        }
        res.redirect('/');
    }
});

//success
app.get('/success', (req, res) => {
    res.send(webPage.success());
})

//start a new game
app.post('/new-game', (req, res) => {
    const { sid }= req.cookies;

    if(sid && sessions[sid]) {
        const { username }= sessions[sid];
        users.chooseNewWord(username);
        users[username].guessedLists = [];
        res.redirect('/');
    }
})

//logout
app.post('/logout', (req, res) => {
    const { sid }= req.cookies;
    delete sessions[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))