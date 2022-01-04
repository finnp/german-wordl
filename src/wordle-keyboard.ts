import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

const firstRow = ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"];
const thirdRow = ["ENTER", "y", "x", "c", "v", "b", "n", "m", "←"];

@customElement("wordle-keyboard")
export class Keyboard extends LitElement {
  static styles = css`
    :host {
      margin: 16px;
    }
    button {
      text-transform: uppercase;
      font-size: 2rem;
    }
  `;

  render() {
    return html`
      <div>
        <div class="row">
          ${firstRow.map(
            (letter) =>
              html`
                <wordle-keyboard-button
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
      font-size: 2rem;
    }
  `;

  @property({ type: String })
  letter: string = "";

  render() {
    return html`
      <button @click=${this.handleClick}>${this.letter}</button>
    `;
  }

  handleClick(event) {
    this.dispatchEvent(
      new CustomEvent("letter-clicked", {
        detail: event.target.innerText,
        bubbles: true,
        composed: true,
      })
    );
  }
}
