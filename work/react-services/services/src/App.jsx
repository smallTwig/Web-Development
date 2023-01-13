import { useState, useEffect } from 'react';
import './app.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchWord,
  fetchChangeWord
} from './services';

import LoginForm from './LoginForm';
import Word from './Word';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import ChangeWord from './ChangeWord';

function App() {
  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); 
  const [ word, setWord ] = useState('');
  const [ isWordPending, setIsWordPending ] = useState(false);

  function onLogin( username ) {
    setIsWordPending(true);
    fetchLogin(username)
    .then( () => {
      setError(''); 
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      return fetchWord();
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    })
    .then( word => {
      setWord( word );
      setIsWordPending(false);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
    ;
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onChangeWord(word) {
    setError('');
    checkForSession();
    fetchChangeWord(username, word)
    .then( word => {
      setWord(word);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function checkForSession() {
    fetchSession()
    .then( session => { 
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); 
      return fetchWord(); 
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err); 
    })
    .then( word => {
      setWord(word);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) {
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    });

  }

  useEffect(
    () => {
      checkForSession();
    },
    [] 
  );

  return (
    <div className="app">
      <header className='header'>
        <div className="header-logo">
          <div><img className="logo" src="//placekitten.com/50/50" alt="random cat in lieu of logo"/></div>
          <div className="header-content"><h1 >See Your Word</h1></div>
        </div>
      </header>

      <main className="">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <Controls onLogout={onLogout}/>
            <Word
              isWordPending={isWordPending}
              username={username}
              word={word}
            />
            <ChangeWord onChangeWord={onChangeWord}/>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="cat-emoji-footer footer-content"> 😺😺😺 </div>
      </footer> 
    </div>
  );
}

export default App;
