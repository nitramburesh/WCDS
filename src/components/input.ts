/** @format */

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type Icon } from "../types";
import globalStyles from "../index.css?inline";
import { isInvalidString, throwError } from "../utils/validators";

@customElement("wcds-input")
export class WCDSInput extends LitElement {
  @property({ type: String, reflect: true }) id!: string;
  @property({ type: String }) label!: string;
  @property({ type: String }) icon: Icon | null = null;
  @property({ type: String }) color = "currentColor";
  @property({ type: String }) type = "text";
  @property({ type: String }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Number }) size = 1.6;

  validateAttributes() {
    if (isInvalidString(this.id)) {
      throwError("id");
    }
    if (isInvalidString(this.label)) {
      throwError("label");
    }
  }

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
    try {
      this.validateAttributes();
      return html` <label for="wcds-input" class="input floating-label">
        <span>${this.label}</span>
        ${this.icon && html`<wcds-icon .icon=${this.icon} slot="icon-left" />`}
        <input
          @input=${this.onInput}
          .value=${this.value}
          type=${this.type}
          ?disabled=${this.disabled}
          id=${this.id}
          placeholder="${this.label}"
        />
      </label>`;
    } catch (error) {
      console.error(error);

      return html`<div class="error-box">
        Error: ${(error as Error).message}
      </div>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wcds-input": WCDSInput;
  }
}
