import { MESSAGES } from './constants';

const state = {
  messages : [],
  users: {},
  isLoggedIn: false,
  isLoginPending: true,
  isUsersPending: false,
  isMessagesPending: false,
  username:'',
  error:'',
}

export function waitOnLogin() {
  
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.messages = [];
  state.users = {},
  state.error = '';
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.messages = [];
  state.users = {},
  state.error = '';
}

export function waitOnMessages() {
  state.messages = [];
  state.isMessagesPending = true;
  state.error = '';
}

export function setMessages(messages) {
  state.messages = messages;
  state.isMessagePending = false;
  state.error = '';
}

export function setUsers(username){
  state.users.username = username;
  state.error = '';
}

export function setError(error) {
  console.log(error);
  if(!error) {
    state.error = '';
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;