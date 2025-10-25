/** @format */

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type Icon } from "../types";
import globalStyles from "../index.css?inline";

@customElement("wcds-input")
export class WCDSInput extends LitElement {
  @property({ type: String }) icon!: Icon;
  @property({ type: Number }) size: number = 1.6;
  @property({ type: String }) color: string = "currentColor";
  @property({ type: String }) label!: string;

  static styles = [unsafeCSS(globalStyles)];

  render() {
    return html`
    <label for="wcds-input" class="input floating-label">
      <span>${this.label}</span>
      ${this.icon && html`<wcds-icon .icon=${this.icon} slot="icon-left" />`}
      <input  id="wcds-input" placeholder="${this.label}"></input>
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wcds-input": WCDSInput;
  }
}
