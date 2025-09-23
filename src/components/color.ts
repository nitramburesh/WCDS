import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("wcds-color")
export class WCDSColor extends LitElement {
  @property({ type: String }) color!: string;
  @property({ type: String }) name!: string;

  constructor() {
    super();
  }

  render() {
    return html`<div
      style="display: flex; flex-direction: column; align-items: center; "
    >
      <div
        style="background-color: ${this.color}; 
          height: 100px;
          width: 100px;
          border-radius: 16px;
          border: 1px solid #ccc;"
      ></div>
      <p>${this.name}</p>
    </div> `;
  }
}
