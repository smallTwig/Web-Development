import { isValid }from './username';

function LoginResult({username}) {
  return (
    <div>
      {isValid(username) === "" && <p></p>}
      {isValid(username) === "invalid" && <p> "{username}"is not made of valid characters.</p>}
      {isValid(username)  === "bad" && <p>"{username}" was not a valid user!</p>}
      {isValid(username) === "valid" && <p>Valid username!</p>}
    </div>
  );
}

export default LoginResult;