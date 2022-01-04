import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

const columns = 5;
const rows = 6;

@customElement("wordle-board")
export class Board extends LitElement {
  static get properties() {
    return {
      guesses: { type: Array },
    };
  }

  static styles = css`
    .cell {
      width: 20px;
      height: 20px;
      border: 2px solid black;
      margin: 2px;
    }
    .row {
      display: flex;
      flex-direction: row;
      text-align: center;
    }
  `;

  render() {
    return html`
      <div class="table">
        ${Array(rows)
          .fill(0)
          .map(
            (_, row) => html`
              <div class="row">
                ${Array(columns)
                  .fill(0)
                  .map(
                    (_, column) =>
                      html`
                        <div class="cell">
                          ${this.guesses[row][column]}
                        </div>
                      `
                  )}
              </div>
            `
          )}
      </div>
    `;
  }
}
