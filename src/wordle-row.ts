import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

const columns = 5;
const niceYellow = "#f0e68c";
const niceGreen = "#98fb98";

@customElement("wordle-row")
export class Row extends LitElement {
  @property({ type: String })
  guess = "";

  @property({ type: String })
  correctAnswer = "xxxxx";

  @property({ type: Boolean })
  reveal = false;

  static styles = css`
    .row {
      display: flex;
      flex-direction: row;
      text-align: center;
    }
  `;

  render() {
    return html`
      <div class="row">
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
class Cell extends LitElement {
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
      width: 20px;
      height: 20px;
      border: 2px solid black;
      margin: 2px;
      text-transform: uppercase;
    }
  `;

  getBackgroundColor() {
    if (!this.reveal) return "white";

    if (this.letter === "") return "white";
    if (this.letter.toLocaleLowerCase() === this.correctLetter.toLowerCase())
      return niceGreen;
    if (this.correctAnswer.includes(this.letter.toLowerCase()))
      return niceYellow;
    return "white";
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
