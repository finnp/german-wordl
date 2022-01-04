import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Keyboard } from "./wordle-keyboard.js";

const wordLength = 5;

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
  currentWord = "vater";

  constructor() {
    super();
    document.addEventListener("keyup", (event: KeyboardEvent) => {
      if (event.key === "Enter") return this.onKeyboard({ detail: "ENTER" });
      if (event.key === "Backspace") return this.onKeyboard({ detail: "←" });
      this.onKeyboard({ detail: event.key });
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
      <wordle-keyboard @letter-clicked=${this.onKeyboard}></wordle-keyboard>
    `;
  }

  onKeyboard(event: { detail: string }) {
    if (event.detail === "ENTER") {
      if (wordLength === this.guesses[this.currentRow].length)
        this.currentRow++;
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
