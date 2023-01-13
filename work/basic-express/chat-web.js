const chatWeb = {
  chatPage: function(chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="chat.css">
        </head>
      
        <body>
          <header>
            <div class="chat-room-logo">
              <div><img class="logo" src="//placekitten.com/50/50" alt="random cat in lieu of logo"/></div>
              <div><h1>Chat</h1></div>
            </div>
          </header>

          <main>
            <div id="chat-app">
              ${chatWeb.getUserList(chat)}  
              ${chatWeb.getMessageList(chat)}
              ${chatWeb.getOutgoing(chat)}
            </div>    
          </main>

          <footer>
            <div class="cat-emoji-footer"> 😺😺😺 </div>
          </footer>   
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
    Object.values(chat.messages).map( message =>`
    <li>
      <div class="message">
        <div class="sender-info">
          <img class="avatar" alt="avatar of amit" src="images/avatar-${message.sender}.jpg"/>
          <span class="username">${message.sender}</span>
        </div>
        <p class="message-text">${message.text}</p>
      </div>
    </li>`).join('') + 
    `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function(chat) {
    return `<div class="outgoing">
            <form action="/chat" method="POST">
              <input name="username" type="hidden" value="Amit" placeholder=""/>
              <input class="to-send" name="text" type="textarea" placeholder="  Enter message to send"/>
              <button type="submit" class="send-button">Send Message</button>
            </form>
          </div>`;
  }
};
module.exports = chatWeb;
