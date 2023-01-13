import {
  fetchLogin,
  fetchLogout,
  fetchAddMessage,
  fetchMessages,
  fetchSession,
  fetchUsers,
} from './services';
import {
  waitOnMessages,
  setMessages,
  setError,
  login,
  logout,
  setUsers,
} from './state';
import render from './render';

//Login to get all users and messages
export function addAbilityToLogin({ state,  appEl }) {
  appEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!e.target.classList.contains('login__form')) {
      return;
    }

    const username = appEl.querySelector('.login__username').value;
    waitOnMessages();
    render({ state, appEl }); 
    fetchLogin( username )
    .then( messages => {
      login(username);
      setMessages(messages);
      setUsers(username);
      render({ state, appEl });
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
      render({ state, appEl });
    });

  });
}

//Logout
export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('controls__logout')) {
      return;
    }
    logout();
    render({ state, appEl });
    fetchLogout() 
    .catch( err => {
      setError(err?.error || 'ERROR'); 
      render({ state, appEl });
    });
  });
}

//Click to refresh page
export function addAbilityToRefresh({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('controls__refresh')) {
      return;
    }

    waitOnMessages(); 
    render({ state, appEl });
    fetchMessages()
    .then( messages => {
      setMessages(messages);
      render({ state, appEl });
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
  });
}

//Send a message
export function addAbilityToAddMessage({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if(!e.target.classList.contains('send__form')) {
      return;
    }
    const message = appEl.querySelector('.send__message').value;
    fetchAddMessage(message)
    .then( messages => {
      setMessages(messages);
      render({ state, appEl });
    })
    .catch( err => {
      console.log(err);
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}