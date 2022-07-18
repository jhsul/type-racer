import { FunctionComponent, useRef } from "react";
import { GameState } from "./Game";

const progress = (wordIndex: number, charIndex: number, words: string[]) => {
  return (
    (100 * (wordIndex + charIndex / words[wordIndex].length)) / words.length
  );
};

const GameProgress: FunctionComponent<{ state: GameState }> = ({
  state: { latestWpm, wordIndex, charIndex, words },
}) => {
  const horseRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <div className="game-progress">
      <a>🚩</a>
      <div style={{ flex: "1", borderBottom: "1px solid #eaeaea" }}>
        <a
          ref={horseRef}
          style={
            horseRef.current
              ? {
                  left: `min(${progress(
                    wordIndex,
                    charIndex,
                    words
                  )}%, calc(100% - ${
                    horseRef.current?.getBoundingClientRect().width
                  }px))`,
                  position: "relative",
                }
              : {}
          }
        >
          🏇
        </a>
      </div>
      <a>{`🏁 ${latestWpm} wpm`}</a>
    </div>
  );
};

export default GameProgress;
