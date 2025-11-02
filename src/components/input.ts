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
  @property({ type: String, reflect: true }) error?: string;
  @property({ type: Boolean }) required: boolean = false;

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
      new CustomEvent("input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    );
    if (this.error) this.dispatchEvent(new CustomEvent("clear-error"));
  }

  getErrorStyles() {
    return this.error ? "input-error" : "";
  }
  render() {
    try {
      this.validateAttributes();
      return html`
        <div class="flex flex-col gap-1 w-full">
          <label
            for="wcds-input"
            class="input floating-label ${this.getErrorStyles()}"
          >
            <span>${this.label}</span>
            ${this.icon &&
            html`<wcds-icon .icon=${this.icon} slot="icon-left" />`}
            <input
              required=${this.required ? true : false}
              @input=${this.onInput}
              .value=${this.value}
              type=${this.type}
              ?disabled=${this.disabled}
              id=${this.id}
              placeholder="${this.label}"
            />
          </label>
          <span class="text-error text-xs">${this.error}</span>
        </div>
      `;
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
