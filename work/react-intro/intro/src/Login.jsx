import { useState } from "react";
import LoginResult from "./LoginResult";
import { isValid } from "./username";

function Login( {onLogin} ){
  const [username, setUsername] = useState('');
  
  return (
    <div>
      <form>
        <label>
          <span>Username: </span>
          <input value={username} onInput={(e) => setUsername(e.target.value)} />
        </label>
        <button type="button" onClick={ () => {
          if (isValid(username.toLowerCase()) === 'valid') {
            onLogin(username)}
          }
          }>Login</button>
      </form>
      <LoginResult username={username}/>
    </div>
  );
}

export default Login;