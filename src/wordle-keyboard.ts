import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

const firstRow = ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"];
const secondRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"];
const thirdRow = ["ENTER", "y", "x", "c", "v", "b", "n", "m", "←"];

@customElement("wordle-keyboard")
export class Keyboard extends LitElement {
  handleClick(event) {
    this.dispatchEvent(
      new CustomEvent("letter-clicked", { detail: event.target.innerText })
    );
  }

  static styles = css`
    button {
      text-transform: uppercase;
    }
  `;

  render() {
    return html`
      <div>
        <div class="row">
          ${firstRow.map(
            (letter) =>
              html`
                <button @click=${this.handleClick}>${letter}</button>
              `
          )}
        </div>
        <div class="row">
          ${secondRow.map(
            (letter) =>
              html`
                <button @click=${this.handleClick}>${letter}</button>
              `
          )}
        </div>
        <div class="row">
          ${thirdRow.map(
            (letter) =>
              html`
                <button @click=${this.handleClick}>${letter}</button>
              `
          )}
        </div>
      </div>
    `;
  }
}
