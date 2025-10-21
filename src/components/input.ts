import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { type Icon } from "../types";

@customElement("wcds-input")
export class WCDSInput extends LitElement {
  @property({ type: String }) icon!: Icon;
  @property({ type: Number }) size: number = 1.6;
  @property({ type: String }) color: string = "currentColor";
  @property({ type: String }) placeholder!: string;
  @property({ type: String }) label!: string;

  get styles() {
    return {
      display: "flex",
      alignItems: "center",
      minWidth: "200px",
      justifyContent: "center",
      width: `${this.size}rem`,
      height: `${this.size}rem`,
      color: this.color,
    };
  }

  render() {
    return html`
    <label for="wcds-input">
      ${this.label}
      <input id="wcds-input" style="${styleMap(this.styles)}" placeholder="${
      this.placeholder
    }"></input>
    </label>`;
  }
}
