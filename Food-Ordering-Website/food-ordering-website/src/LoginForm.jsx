import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); 
    if(username) {  
      onLogin(username); 
    }
  }

  return (
    <div className='login'>
      <form className='login-form' onSubmit={onSubmit}>
        <div className='login-section'>
          <div className="welcome-foodzone">Welcome to FoodZone!</div>
          <div> Let's order your food! </div>
          <div className='login-content'>
            <span> Username: </span>
            <input value={username} onChange={onChange}/>
            <button className="login-button button">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;