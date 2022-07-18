import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { getQuote, sleep, wpm } from "../../main";
import GameProgress from "./GameProgress";
import GameText from "./GameText";

export interface GameState {
  words: string[];
  author: string;

  startTime?: number;
  endTime?: number;

  latestWpm: number;

  isStarted: boolean;
  isCountdown: boolean;
  isFinished: boolean;
  isError: boolean;

  countdown: number;

  wordIndex: number;
  charIndex: number;
}

const Game: FunctionComponent = () => {
  const [state, setState] = useState<GameState>({
    isStarted: false,
    isCountdown: false,
    isFinished: false,
    isError: false,

    countdown: 0,

    charIndex: 0,
    wordIndex: 0,
    latestWpm: 0,

    ...getQuote(), // Get words and author from here
  });

  const gameRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleStart = async () => {
    if (!inputRef.current) return;
    //startButtonRef.current.disabled = true;

    if (state.isStarted && !state.isFinished) return;

    if (state.isFinished) {
      setState({
        isStarted: false,
        isCountdown: false,
        isFinished: false,
        isError: false,
        charIndex: 0,
        wordIndex: 0,
        latestWpm: 0,
        countdown: 0,

        ...getQuote(),
      });
      inputRef.current.value = "";
    }

    setState((s) => {
      return { ...s, isCountdown: true };
    });

    // Countdown
    for (let i = 3; i > 0; i--) {
      setState((s) => {
        return { ...s, countdown: i };
      });
      await sleep(1000);
    }

    //startButtonRef.current.innerText = "Playing";

    // Start the game
    //startButtonRef.current.hidden = true;

    //Force this DOM update in (react will do it on its own, but too slowly)
    inputRef.current.disabled = false;
    inputRef.current.focus();

    setState((s) => {
      return {
        ...s,
        startTime: Date.now(),
        isCountdown: false,
        isStarted: true,
      };
    });
  };

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;

    //console.log(state.text[state.currentWordIndex]);
    //console.log(inputRef.current.value);

    const currentWord = state.words[state.wordIndex];
    const enteredWord = inputRef.current.value;

    // Finish
    if (
      enteredWord === currentWord &&
      state.wordIndex === state.words.length - 1
    ) {
      confetti();
      gameRef.current?.focus();
      setState((s) => {
        return {
          ...s,
          charIndex: enteredWord.length,
          latestWpm: wpm(s.wordIndex + 1, Date.now() - s.startTime!),
          isFinished: true,
        };
      });
      return;
      // Got any word right except the last one
    } else if (enteredWord === currentWord + " ") {
      setState((s) => {
        return {
          ...s,
          isError: false,
          charIndex: 0,
          wordIndex: s.wordIndex + 1,
          latestWpm: wpm(s.wordIndex + 1, Date.now() - s.startTime!),
        };
      });
      inputRef.current.value = "";
      return;
    } else if (currentWord.startsWith(enteredWord)) {
      setState((s) => {
        return {
          ...s,
          isError: false,
          charIndex: enteredWord.length,
        };
      });
      return;
    } else {
      setState((s) => {
        return {
          ...s,
          isError: true,
          charIndex: s.charIndex + 1,
        };
      });
      return;
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      console.log("Enter pressed");
      handleStart();
    }
  };

  return (
    <div className="game" onKeyDown={handleKeydown} ref={gameRef}>
      <GameProgress state={state} />
      <br />
      <GameText state={state} />
      <div className="hbox">
        <input
          type="text"
          className={`form-control text-input mx-1 ${
            state.isError ? "is-invalid" : ""
          }`}
          ref={inputRef}
          disabled={!state.isStarted || state.isFinished}
          onChange={handleInput}
        />
        <button
          className="btn btn-success mx-1"
          onClick={handleStart}
          disabled={state.isCountdown || (state.isStarted && !state.isFinished)}
        >
          {state.isCountdown ? (
            <>
              {state.countdown} <kbd>↵</kbd>
            </>
          ) : (
            <>
              Start <kbd>↵</kbd>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Game;
