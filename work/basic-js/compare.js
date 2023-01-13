"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
  word = word.toLowerCase();
  guess = guess.toLowerCase();
  let ans = 0;

  for (let i in word){
    if (guess.includes(word[i])){
      ans++;
      guess = guess.replace(word[i], "");
    }
  }
  return ans;
}
