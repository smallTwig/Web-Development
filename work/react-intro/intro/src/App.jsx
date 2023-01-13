import './app.css';
import { useState } from 'react';
import Game from './Game';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const onLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };
  const onLogout = () => setIsLoggedIn(false);

  return (
    <div className="app">
      <header className='header'>
        <div className="header-logo">
          <div><img className="logo" src="//placekitten.com/50/50" alt="random cat in lieu of logo"/></div>
          <div className="header-content"><h1 >Word Guess</h1></div>
        </div>
      </header>

      <div className="content">
        {
          isLoggedIn 
          ? <Game username={username} onLogout={onLogout} />
          : <Login onLogin={onLogin} />
        }
      </div>

      <footer className="footer">
      <div className="cat-emoji-footer footer-content"> 😺😺😺 </div>
      </footer>  
    </div>
  );
}

export default App;
