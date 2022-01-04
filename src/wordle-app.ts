import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Keyboard } from "./wordle-keyboard.js";

const wordLength = 5;

@customElement("wordle-app")
export class WordleApp extends LitElement {
  static styles = css`
    :host {
      height: 100vh;
      font-family: sans-serif;
      text-transform: uppercase;
    }
  `;

  @property({ type: Array })
  guesses = [[], [], [], [], [], []];

  @property({ type: Number })
  currentRow = 0;

  @property({ type: String })
  currentWord = "vater";

  render() {
    return html`
      <wordle-board
        correctAnswer=${this.currentWord}
        currentRow=${this.currentRow}
        .guesses=${this.guesses}
      ></wordle-board>
      <wordle-keyboard @letter-clicked=${this.onKeyboard}></wordle-keyboard>
    `;
  }

  onKeyboard(event) {
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
