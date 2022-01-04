import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

const rows = 6;

@customElement("wordle-board")
export class Board extends LitElement {
  @property({ type: Array })
  guesses: string[][] = [];

  @property({ type: String })
  correctAnswer: string = "xxxxx";

  @property({ type: Number })
  currentRow = 0;

  static styles = css``;

  render() {
    return html`
      <div class="table">
        ${Array(rows)
          .fill(0)
          .map(
            (_, row) => html`
              <wordle-row
                correctAnswer=${this.correctAnswer}
                guess=${this.guesses[row].join("")}
                ?reveal=${row < this.currentRow}
              ></wordle-row>
            `
          )}
      </div>
    `;
  }
}
