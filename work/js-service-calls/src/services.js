
import { fetchSession, fetchLogin, fetchLogout, fetchWord, fetchChangeWord } from "./fetch";

const MESSAGES = {
  'networkError': "Network Error, Please try again",
  'auth-missing': "Please Login",
  'required-username': "Username only contains letters and numbers",
  'auth-insufficient': "Please user other username",
  'invalid-word': "Please use valid word, word only contains letters",
  default: "Something went wrong. Please try again"
};

let stateUser;
let stateWord;

checkSession();

//check session and username
function checkSession() {
  fetchSession()
      .then( (user) => {
        stateUser = user.username;
        fetchWord()
        .then((word) => {
          stateWord = word.storedWord;
          renderWordPage();
        })
        .catch((error) => {
          renderStatus(error);
        })
      })
      .catch( error => {console.log(error); renderLogin() });
      //.catch( () => renderLogin() );
}


// login
function toLogin(){
  const loginButtonEl = document.querySelector('.login-button');
  const usernameEl = document.querySelector('.login-username');
  loginButtonEl.addEventListener('click', (e) => {
        const username = usernameEl.value;
        fetchLogin(username)
            .then(checkSession)
            .catch( error => renderStatus(error) );
  });
}

//log out
function toLogout(){
  const logoutButtonEl = document.querySelector('.logout-button');
  logoutButtonEl.addEventListener('click', (e) => {
      stateWord = undefined;
      fetchLogout()
          .then( () => renderLogin() )
          .catch( error => renderStatus(error) );
  });
}

//change word
function toChange(username){
  const changeButtonEl = document.querySelector('.change-button');
  changeButtonEl.addEventListener('click', (e) => {
    const word = document.querySelector('.to-send').value;
    fetchChangeWord(username, word)
    .then( (nameAndWord) => {
      stateWord = nameAndWord.storedWord;
      renderWordPage();
    })
    .catch(error => renderStatus(error));
  } )
}

//render login page
function renderLogin( ) {
  const loginEl = document.querySelector('.login-page');
  const wordEl = document.querySelector('.word-page');
  loginEl.classList.remove('no-display');
  wordEl.classList.add('no-display');
  loginEl.innerHTML = `
    <div class="login">
      <form action="#">
        Username: <input class="login-username">
        <button type="button" class="send-button login-button">Login</button>
      </form>
    </div>
  `
  toLogin();
  renderStatus('');
}

//render word page
function renderWordPage(){
  const loginEl = document.querySelector('.login-page');
  const wordEl = document.querySelector('.word-page');
  loginEl.classList.add('no-display');
  wordEl.classList.remove('no-display');
  wordEl.innerHTML = `
  <div class="change-word">
  <div class="default-word">
    <div> Username : ${stateUser} </div>
    <div> Your word is : ${stateWord} </div>
  </div>

  <div class="change-word">
    <form action="#">
      <input class="to-send" name="word" type="textarea" placeholder="  Change your word"/>
      <button type="button" class="send-button change-button">Change</button>
      <button type="button" class="send-button logout-button">Logout</button>
    </form>
    <div class="status"></div>
  </div>  
</div> 
  `
  toChange(stateUser);
  toLogout();
  renderStatus('');
}

//render error message
function renderStatus(message) {
  const statusEl = document.querySelector('.status');
  if( !message ) {
      statusEl.innerText = '';
      return;
  }
  const key = message?.error ? message.error : 'default';
  statusEl.innerText = MESSAGES[key] || MESSAGES.default;
}