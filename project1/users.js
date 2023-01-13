const words = require('./words');

const users = {
    newUser: function (username) {
        users[username] = {
            guessedLists: [],
            answer: getRandomWord(words),
            invalid: false,
        }
    },

    chooseNewWord: function (username) {
        users[username].answer = getRandomWord(words);
    }
};

const getRandomWord = function (words) {
    const random = Math.floor(Math.random() * words.length);
    return words[random];
}

module.exports = users;