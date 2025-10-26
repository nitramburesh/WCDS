/** @format */

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type Icon } from "../types";
import globalStyles from "../index.css?inline";

@customElement("wcds-input")
export class WCDSInput extends LitElement {
  @property({ type: String }) icon!: Icon;
  @property({ type: Number }) size = 1.6;
  @property({ type: String }) color = "currentColor";
  @property({ type: String }) label!: string;
  @property({ type: String }) type = "text";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) value = "";

  static styles = [unsafeCSS(globalStyles)];

  private onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new Event("input", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
    <label for="wcds-input" class="input floating-label">
      <span>${this.label}</span>
      ${this.icon && html`<wcds-icon .icon=${this.icon} slot="icon-left" />`}
      <input 
        @input=${this.onInput} 
        .value=${this.value} 
        type=${this.type}
        ?disabled=${this.disabled}
        id="wcds-input" 
        placeholder="${this.label}">
      </input>
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wcds-input": WCDSInput;
  }
}
