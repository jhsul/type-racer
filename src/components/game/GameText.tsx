import { FunctionComponent } from "react";
import { GameState } from "./Game";

const GameText: FunctionComponent<{ state: GameState }> = ({
  state: { words, author, wordIndex, charIndex, isStarted, isFinished },
}) => {
  return (
    <div>
      <p className={!isStarted ? "game-text--hidden" : ""}>
        {isFinished ? (
          <>
            <em className="text-completed">{words.join(" ")}</em>
            <em className="text-author">{` - ${author}`}</em>
          </>
        ) : (
          <>
            <em className="text-completed">
              {words.slice(0, wordIndex).join(" ")}
            </em>{" "}
            <em className="text-current">{words[wordIndex]}</em>{" "}
            <em>{words.slice(wordIndex + 1).join(" ")}</em>
          </>
        )}
      </p>
    </div>
    /*
    <div className="game-text-container">
      {!isStarted ? (
        <p className="game-text--hidden">{words.join(" ")}</p>
      ) : isFinished ? (
        <p className="game-text--finished">{words.join(" ")}</p>
      ) : (
        <p>
          <em className="text-completed">
            {words.slice(0, wordIndex).join(" ")}
          </em>{" "}
          <em className="text-current">{words[wordIndex]}</em>{" "}
          <em>{words.slice(wordIndex + 1).join(" ")}</em>
        </p>
      )}
    </div>*/
  );
};

export default GameText;
