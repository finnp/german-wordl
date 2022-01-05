import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LetterStatus } from "./types";
import { Keyboard } from "./wordle-keyboard.js";
import { words } from "./words";

const wordLength = 5;
const letters = "abcdefghijklmnopqrstuvwxyzüöä";

@customElement("wordle-app")
export class WordleApp extends LitElement {
  static styles = css`
    :host {
      height: 100vh;
      width: 100vw;
      font-family: sans-serif;
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  `;

  @property({ type: Array })
  guesses: string[][] = [[], [], [], [], [], []];

  @property({ type: Number })
  currentRow = 0;

  @property({ type: String })
  currentWord = getRandomWord();

  @property({ type: Object })
  letterStatus: { [key: string]: LetterStatus } = {};

  constructor() {
    super();
    document.addEventListener("keyup", (event: KeyboardEvent) => {
      if (event.key === "Enter") return this.onKeyboard({ detail: "ENTER" });
      if (event.key === "Backspace") return this.onKeyboard({ detail: "←" });
      if (letters.includes(event.key)) this.onKeyboard({ detail: event.key });
    });
  }

  render() {
    return html`
      <h1>Wörtl</h1>
      <wordle-board
        correctAnswer=${this.currentWord}
        currentRow=${this.currentRow}
        .guesses=${this.guesses}
      ></wordle-board>
      <wordle-keyboard
        @letter-clicked=${this.onKeyboard}
        .letterStatus=${this.letterStatus}
      ></wordle-keyboard>
    `;
  }

  updateLetterStatus() {
    for (const position in this.guesses[this.currentRow]) {
      const guessLetter = this.guesses[this.currentRow][position];
      if (guessLetter === this.currentWord[position]) {
        this.letterStatus[guessLetter] = LetterStatus.CorrectPosition;
      } else if (
        this.currentWord.includes(guessLetter) &&
        this.letterStatus[guessLetter] !== LetterStatus.CorrectPosition
      ) {
        this.letterStatus[guessLetter] = LetterStatus.InWord;
      } else if (!this.letterStatus[guessLetter]) {
        this.letterStatus[guessLetter] = LetterStatus.Guessed;
      }
      this.letterStatus = { ...this.letterStatus };
    }
  }

  onKeyboard(event: { detail: string }) {
    if (event.detail === "ENTER") {
      const currentGuess = this.guesses[this.currentRow];
      if (wordLength === currentGuess.length) {
        this.updateLetterStatus();
        this.currentRow++;
      }
      return;
    }

    if (event.detail === "←") {
      this.guesses[this.currentRow] = this.guesses[this.currentRow].slice(
        0,
        -1
      );
      this.guesses = [...this.guesses];
      return;
    }

    if (wordLength <= this.guesses[this.currentRow].length) return;

    this.guesses[this.currentRow].push(event.detail);
    this.guesses = [...this.guesses];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wordle-app": WordleApp;
    "wordle-keyboard": Keyboard;
  }
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
