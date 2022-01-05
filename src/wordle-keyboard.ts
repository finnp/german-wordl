import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { green, yellow } from "./colors";
import { LetterStatus } from "./types";

const firstRow = ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"];
const thirdRow = ["ENTER", "y", "x", "c", "v", "b", "n", "m", "←"];

@customElement("wordle-keyboard")
export class Keyboard extends LitElement {
  static styles = css`
    :host {
      margin: 16px;
    }
  `;

  @property({ type: Object })
  letterStatus: { [key: string]: LetterStatus } = {};

  render() {
    return html`
      <div>
        <div class="row">
          ${firstRow.map(
            (letter) =>
              html`
                <wordle-keyboard-button
                  letterStatus=${this.letterStatus[letter]}
                  letter=${letter}
                ></wordle-keyboard-button>
              `
          )}
        </div>
        <div class="row">
          ${secondRow.map(
            (letter) =>
              html`
                <wordle-keyboard-button
                  letterStatus=${this.letterStatus[letter]}
                  letter=${letter}
                ></wordle-keyboard-button>
              `
          )}
        </div>
        <div class="row">
          ${thirdRow.map(
            (letter) =>
              html`
                <wordle-keyboard-button
                  letterStatus=${this.letterStatus[letter]}
                  letter=${letter}
                ></wordle-keyboard-button>
              `
          )}
        </div>
      </div>
    `;
  }
}

@customElement("wordle-keyboard-button")
export class KeyboardButton extends LitElement {
  static styles = css`
    button {
      text-transform: uppercase;
      font-size: 1.8rem;
      border: 1px solid black;
      border-radius: 5px;
      margin: 2px;
    }
  `;

  @property({ type: String })
  letter: string = "";

  @property({ type: Number })
  letterStatus: LetterStatus = LetterStatus.NotGuessed;

  render() {
    return html`
      <style>
        button {
          background-color: ${this.getBackgroundColor()};
        }
      </style>
      <button @click=${this.handleClick}>${this.letter}</button>
    `;
  }

  getBackgroundColor() {
    switch (this.letterStatus) {
      case LetterStatus.NotGuessed:
        return "white";
      case LetterStatus.InWord:
        return yellow;
      case LetterStatus.CorrectPosition:
        return green;
      case LetterStatus.Guessed:
        return "grey";
      default:
        return "white";
    }
  }

  handleClick(event: MouseEvent) {
    const element = event.target as HTMLElement;

    this.dispatchEvent(
      new CustomEvent("letter-clicked", {
        detail: element.innerText,
        bubbles: true,
        composed: true,
      })
    );
  }
}
