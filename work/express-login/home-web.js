const homeWeb = {
  login: function() {
    return `<!doctype html>
    <html>
      <head>
        <title>Login</title>
        <link rel="stylesheet" href="home.css">
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

  loginFailed: function(errors) {
    return `<!doctype html>
    <html>
      <head>
        <title>Login Failed</title>
        <link rel="stylesheet" href="home.css">
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

  dataPage: function(username, word) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Login Successfully</title>
        <link rel="stylesheet" href="home.css">
      </head>
    
      <body>
        <header>
          <div class="header-logo">
            <div><img class="logo" src="//placekitten.com/50/50" alt="random cat in lieu of logo"/></div>
            <div><h1>Login Successfully</h1></div>

            <div class="logout">
              <form action="/logout" method="POST">
                <button type="submit" class="send-button">Logout</button>
              </form>
          </div>
          </div>
        </header>

        <main>
        <div class="change-word">
          <div class="default-data">
            <p>Username : ${username} </p>
            <p>Your word is : ${word} </p>
          </div>

          <div id="change-data">
            <form action="/change" method="POST">
              <input class="to-send" name="word" type="textarea" placeholder="  Change your word"/>
              <button type="submit" class="send-button">Change</button>
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
  }
}

module.exports = homeWeb;