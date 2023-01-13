import { useState } from 'react';

function ChangeWord({ onChangeWord }){

  const [ word, setWord ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); 
    setWord('');
    onChangeWord(word);
  }

  function onTyping(e) {
    setWord(e.target.value);
  }

  return(
    <form className="change__form" action="#/add" onSubmit={onSubmit}>
      <input className="change__word" value={word} onChange={onTyping}/>
      <button type="submit" className="change__button">Change</button>
    </form>
  );
}

export default ChangeWord;