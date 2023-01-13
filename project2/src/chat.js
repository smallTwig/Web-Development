import { SERVER, CLIENT } from './constants';
import state, {
  login,
  logout,
  setError,
  setMessages,
  setUsers,
} from './state';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchMessages,
  fetchUsers,
  fetchAddMessage,
} from './services';
import render, { renderMessages } from './render';
import {
  addAbilityToLogin,
  addAbilityToLogout,
  addAbilityToRefresh,
  addAbilityToAddMessage,
} from './listeners';

const appEl = document.querySelector('#app');

render({ state, appEl });
addAbilityToLogin({ state,  appEl });
addAbilityToLogout({ state, appEl });
addAbilityToRefresh({ state, appEl });
addAbilityToAddMessage({ state, appEl });
checkForSession();
poll();// auto-refresh users and messages

//Check session
function checkForSession() {
  fetchSession()
  .then( username => { 
    login(username.username); 
    setUsers(username.username);
    render({ state, appEl });           
    return fetchMessages(); 
  })
  .catch( err => {
    if( err?.error === SERVER.AUTH_MISSING ) {
      return Promise.reject({ error: CLIENT.NO_SESSION }) 
    }
    return Promise.reject(err); 
  })
  .then( messages => {
    setMessages(messages);
    render({ state, appEl });
  })
  .catch( err => {
    if( err?.error == CLIENT.NO_SESSION ) { 
      logout(); 
      render({ state, appEl });
      return;
    }
   
    setError(err?.error || 'ERROR'); 
    render({ state, appEl });
  });
}

// Every 5 seconds to refresh messages and userlist content except other area
function refreshMessages(){
  fetchMessages()
  .then( messages => {
    setMessages(messages);
    renderMessages(state);
  })
  .catch( err => {
    if( err?.error == CLIENT.NO_SESSION ) { 
      logout(); 
      render({ state, appEl });
      return;
    }
  })
}

function poll(){
  refreshMessages();
  setTimeout(poll, 5000);
}
