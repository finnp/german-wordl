import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { green, yellow } from "./colors";

const columns = 5;

@customElement("wordle-row")
export class Row extends LitElement {
  @property({ type: String })
  guess = "";

  @property({ type: String })
  correctAnswer = "xxxxx";

  @property({ type: Boolean })
  reveal = false;

  @property({ type: Boolean })
  rejectAnimation = false;

  static styles = css`
    .row {
      display: flex;
      flex-direction: row;
      text-align: center;
    }

    .shake {
      animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }

    @keyframes shake {
      10%,
      90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }

      30%,
      50%,
      70% {
        transform: translate3d(-6px, 0, 0);
      }

      40%,
      60% {
        transform: translate3d(6px, 0, 0);
      }
    }
  `;

  render() {
    return html`
      <div class="row ${this.rejectAnimation ? "shake" : ""}">
        ${Array(columns)
          .fill(0)
          .map(
            (_, column) =>
              html`
                <wordle-cell
                  correctAnswer=${this.correctAnswer}
                  correctLetter=${this.correctAnswer[column]}
                  letter=${this.guess[column]}
                  ?reveal=${this.reveal}
                ></wordle-cell>
              `
          )}
      </div>
    `;
  }
}

@customElement("wordle-cell")
export class Cell extends LitElement {
  @property({ type: String })
  letter = "";

  @property({ type: String })
  correctAnswer = "xxxxx";

  @property({ type: String })
  correctLetter = "";

  @property({ type: Boolean })
  reveal = false;

  static styles = css`
    div {
      width: 50px;
      height: 50px;
      border: 2px solid black;
      margin: 2px;
      font-size: 1.5rem;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  getBackgroundColor() {
    if (!this.reveal) return "white";

    if (this.letter === "") return "white";
    if (this.letter.toLocaleLowerCase() === this.correctLetter.toLowerCase())
      return green;
    if (this.correctAnswer.includes(this.letter.toLowerCase())) return yellow;
    return "grey";
  }

  render() {
    return html`
      <style>
        div {
          background-color: ${this.getBackgroundColor()};
        }
      </style>
      <div>
        ${this.letter}
      </div>
    `;
  }
}
