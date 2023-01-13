function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

export function isValid(username){
  const name = username.toLowerCase();
  if (name === ''){
    return 'empty';
  }else if (!isValidUsername(name)){
    return 'invalid';
  }else if (name === 'dog'){
    return 'bad';
  }else {
    return 'valid';
  }
}