function render({ state, appEl }) {
  const html = `
   <main class="chatroom-section">
     ${ generateStatusHtml( state ) }
     ${ generateLoginHtml( state ) }
     ${ generateContentHtml( state ) }
   </main>
  `;
  appEl.innerHTML = html;
}

function generateStatusHtml( state ) {
  return `
      <div class="status">${state.error}</div>
  `;
}

function generateLoginHtml( state ) {
  if(state.isLoginPending) {
    return `
      <div class="login__waiting">Loading user...</div>
    `
  }
  if(state.isLoggedIn) {
    return ``;
  }

  return `
      <div class="login">
        <form class="login__form" action="#/login">
          <label>
            <span>Username:</span>
            <input class="login__username" value="">
          </label>
          <button class="login__button" type="submit">Login</button>
        </form>
      </div>
  `;
}

function generateContentHtml( state ) {
  if(!state.isLoggedIn) {
    return ``;
  }
  
  return `
      <div class="content">
        <div class="refresh-users>
        <ol class="users"> Users List: ${generateAllCurrentUsers( state )} </ol>
        <div>
        ${generateControlsHtml( state )}
        <div class="refresh-messages">
          <ul class="messages">${generateMessagesHtml( state )}</ul>
        </div>
        ${generateSendMessageHtml( state )}
      </div>
  `;
}

function generateControlsHtml( state ) {
  return `
        <div class="controls">
          <button class="controls__refresh">Refresh</button>
          <button class="controls__logout">Logout</button>
        </div>
  `;
}

function generateAllCurrentUsers( state ) {
  if (!state.users){
    return ``;
  }
  
  const usersHtml = Object.values(state.users).map( user => {
    return `
    <li class="user">
          <span> ${user} </span>
    </li>
    `;
  }).join('');
  return usersHtml;
}

function generateMessagesHtml( state ) {
  const messagesHtml = Object.values(state.messages).map( message => {
    return `
      <li class="message">
          <span> ${message.username} : ${message.message} </span>
      </li>
      `;
  }).join('') || `<p>No messages yet, send one!</p>`;
  return messagesHtml;
}

function generateSendMessageHtml( state ) {
  return `
        <form class="send__form" action="#/add">
          <input class="send__message">
          <button type="submit" class="send__button">Send</button>
        </form>
  `;
}

export function renderMessages( state ){
  const messageEl = document.querySelector('.refresh-messages');
  const usersEl = document.querySelector('.refresh-users');
  messageEl.innerHTML =  `
    <ul class="messages">${generateMessagesHtml( state )}</ul>
  `
  usersEl.innerHTML = `
    <ol class="users"> Users List: ${generateAllCurrentUsers( state )} </ol>
  `
}

export default render;
