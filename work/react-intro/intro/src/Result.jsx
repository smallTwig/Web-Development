import { getResult } from './compare';

function Result({ word }) {
    return (
        <div className="guess-result">
            {getResult(word) === "empty" && <p></p>}
            {getResult(word) === "invalid" && <p>"{word}" was not a valid word!</p>}
            {getResult(word) === "valid" && <p>"{word}" is the secret word!</p>}
            {getResult(word) >= 0 && getResult(word) <= 5 && <p>"{word}" had {getResult(word)} letters in common.</p>}
        </div>
    );
}

export default Result;