const users = {};

function isValid(username){
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function getUserData(username){
  return users[username];
}

function getAllUsers(){
  return users;
}

module.exports = {
  isValid,
  getUserData,
  getAllUsers,
}