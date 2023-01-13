const messages = [
  {
    username: "Amit",
    message: "You up?",
  },
  {
    username: "Bao",
    message: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ username, message }) { 
  const newMessage = {};
  newMessage.username = username;
  newMessage.message = message;
  messages.push(newMessage);
}

function getAllMessages(){
  return messages;
}

module.exports = {
  addMessage,
  getAllMessages,
}