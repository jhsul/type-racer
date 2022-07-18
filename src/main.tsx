import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import quotes from "./quotes.json";

import "./styles.scss";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const wpm = (w: number, t: number) => Math.round((w / t) * 1000 * 60);

export const getQuote = () => {
  const { q, a } = quotes[Math.floor(Math.random() * quotes.length)];
  return { words: q.trim().split(" "), author: a };
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
