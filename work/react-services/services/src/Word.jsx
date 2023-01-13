import Loading from './Loading';

function Word ({ isWordPending, username, word}){
  const SHOW = {  
    PENDING: 'pending',
    WORD: 'word',
  };
  
  let show;
  if(isWordPending) {
    show = SHOW.PENDING;
  } else {
    show = SHOW.WORD;
  }

  return (
  <div class="default-word">
    { show === SHOW.PENDING && <Loading className="word__waiting">Loading Word...</Loading> }
    { show === SHOW.WORD && 
    <div>
      <div> Username : {username} </div>
      <div> Your word is : {word} </div> 
    </div>}
    
  </div>
  );
}

export default Word;