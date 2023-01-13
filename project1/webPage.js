const words = require('./words');
const users = require('./users');

const webPage = {
    loginPage: function() {
        return `<!doctype html>
        <html>
          <head>
            <title>Login</title>
            <link rel="stylesheet" href="style.css">
          </head>
        
          <body>
            <header>
              <div class="header-logo">
                <div><img class="logo" src="//placekitten.com/50/50" alt="random cat in lieu of logo"/></div>
                <div><h1>Login</h1></div>
              </div>
            </header>
            <main>
              <div class="login">
                <form action="/login" method="POST">
                  Username: <input name="username">
                  <button type="submit" class="send-button">Login</button>
                </form>
              </div>
            </main>
            <footer>
              <div class="cat-emoji-footer"> 😺Please Login😺 </div>
            </footer>   
          </body>
        </html>
        `;
    },

    loginFail: function (errors) {
        return `<!doctype html>
        <html>
          <head>
            <title>Login Failed</title>
            <link rel="stylesheet" href="style.css">
          </head>
        
          <body>
            <header>
              <div class="header-logo">
                <div><img class="logo" src="//placekitten.com/50/50" alt="random cat in lieu of logo"/></div>
                <div><h1>Error</h1></div>
              </div>
            </header>
            <main>
              <div class="login-failed">
                <p> ${errors} </p>
                <p> Please <a href="/"> Login Again </a> </p>
              </div>
            </main>
            <footer>
              <div class="cat-emoji-footer"> 😺Please Login Again😺 </div>
            </footer>   
          </body>
        </html>
        `;
    },

    guessPage: function (username) {
        return `
        <!doctype html>
        <html>
          <head>
            <title>Wolrd Guess Game</title>
            <link rel="stylesheet" href="style.css">
          </head>
        <body>

        <header>
          <div class="header-logo">
            <div><img class="logo" src="//placekitten.com/50/50" alt="random cat in lieu of logo"/></div>
            <div><h1>Guess the Word Game</h1></div>
            <div class="logout">
              <form action="/logout" method="POST">
                <button type="submit" class="send-button">Logout</button>
              </form>
          </div>
          <div class="restart">
            <form action="/new-game" method="POST">
                <button type="submit" class="send-button">Restart</buttom>
            </form>
          </div>
          </div>
        </header>
            <div class="guessPage">
                <p class="welcome">Username: Welcome! ${username}</p>
                <div class="words">
                    <h3>Word List</h3>
                    ${webPage.getWordList(words)}
                </div>
                <div>
                    <div class="guess-data">
                        <form class="input-form" action="/guess" method="POST">
                            <input class="to-send" name="guessedWord" value="" placeholder=" Enter you guessing word" />
                            <button type="submit" class="send-button">Guess!</buttom>
                        </form>
                    </div>
                    <div class="error-input">
                        ${webPage.checkWord(username)}
                    </div>
                    <div class="wrong-answers">
                        <div class="previous-guess">Previous Guess
                        ${webPage.getPreviousGuess(username)}
                        </div>
                    </div>
                </div>
            </div>

            <footer>
            <div class="cat-emoji-footer"> 😺😺😺 </div>
            </footer> 
        </body>
        </html>
        `
    },

    success: function(){
     return`
     <!doctype html>
     <html>
       <head>
         <title>Win@</title>
         <link rel="stylesheet" href="style.css">
       </head>
     
       <body>
         <header>
           <div class="header-logo">
             <div><img class="logo" src="//placekitten.com/50/50" alt="random cat in lieu of logo"/></div>
             <div><h1>Congratulations! You win! </h1></div>
           </div>
         </header>
         <main>
           <div class="login">
           <div class="restart">
                <form action="/new-game" method="POST">
                    <button type="submit" class="send-button">New Game</buttom>
                </form>
            </div>
           </div>
         </main>
         <footer>
           <div class="cat-emoji-footer"> 😺😺😺 </div>
         </footer>   
       </body>
     </html>
    `;
    },

    // get the default word list
    getWordList: function(words){
        return `<div>` +
        words.map(word => `<span>${word}</span>
        `).join('') +
        `</div>`;
    },

    //Check if the entered word is in the list
    checkWord: function (username) {
        if(users[username].invalid) return `The word is not in the list, try again.`;
        return ``;
    },

    // get the previous guessed word and matched letters
    getPreviousGuess: function (username) {
        return `<ol class="guessedWords">` +
            Object.keys(users[username].guessedLists).map(word => `
            <li> 
              <p>${word} matches ${users[username].guessedLists[word]['matched']}</p>
            </li>
            `).join('') +
            `</ol>`;
    },

    //match two words letters
    matchLetters: function (username, guessedWord) {
        const ans = users[username].answer;
        let matched = 0;
        const letterCount = {};

        for (let letter of ans.toLowerCase()) {
            if (letterCount[letter]) {
                letterCount[letter] += 1;
            } else {
                letterCount[letter] = 1;
            }
        }

        for (let letter of guessedWord.toLowerCase()) {
            if (letterCount[letter]) {
                letterCount[letter] -= 1;
                matched += 1;
            }
        }
        return matched;
    },
}

module.exports = webPage;