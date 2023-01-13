import Result from "./Result";
import { useState } from "react";

function Game( {username, onLogout}){
  const [inputWord, setInputWord] = useState('');
  const [submitWord, setSubmitWord] = useState('');

  return (
    <div className="guess-page">
      <div className="guess-logout"> 
        <span>Hello {username} </span>
        <span><button onClick={onLogout}>Logout</button></span>
      </div>
      <div className="hint"> Please enter a 5 letter word </div>
      <form className="guess-input-section">
        <label>
          <span>Your Guess:  </span>
        </label>
        <input value={inputWord} onInput={ (e) => setInputWord(e.target.value)} />
        <button type="button" onClick = { () => { setSubmitWord(inputWord); setInputWord('')}}> Submit </button>
      </form>
      <Result word = {submitWord}/>
    </div>
  );
}

export default Game;