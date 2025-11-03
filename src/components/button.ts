/** @format */

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type Icon } from "../types";
import globalStyles from "../index.css?inline";
import "./icon.js";
import {
  isInvalidString,
  throwInvalidAttributeError,
} from "../utils/validators.js";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";
@customElement("wcds-button")
export class WCDSButton extends LitElement {
  static styles = [unsafeCSS(globalStyles)];

  @property({ type: String, reflect: true }) id!: string;
  @property({ type: String }) label!: string;
  @property({ type: String }) size: ButtonSize = "md";
  @property({ type: String }) variant: ButtonVariant = "primary";
  @property({ type: String, reflect: true }) type: ButtonType = "button";
  @property({ type: String }) iconLeft?: Icon;
  @property({ type: String }) iconRight?: Icon;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleClick(event: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent("wcds-click", {
        detail: event,
        bubbles: true,
        composed: true,
      }),
    );
  }

  validateAttributes() {
    if (isInvalidString(this.id)) {
      throwInvalidAttributeError("id");
    }
    if (isInvalidString(this.label)) {
      throwInvalidAttributeError("label");
    }
  }

  getVariantClass() {
    switch (this.variant) {
      case "primary":
        return "btn-primary";
      case "secondary":
        return "btn-secondary";
      default:
        return "btn-primary";
    }
  }

  render() {
    try {
      this.validateAttributes();

      return html`
        <button
          @click=${this.handleClick}
          class="btn uppercase ${this.getVariantClass()}"
          type=${this.type}
          ?disabled=${this.disabled}
        >
          <span class="flex gap-2 items-center">
            ${this.iconLeft &&
            html`<wcds-icon .icon=${this.iconLeft} slot="icon-left" />`}
            ${this.label}
            ${this.iconRight &&
            html`<wcds-icon .icon=${this.iconRight} slot="icon-right" />`}
          </span>
        </button>
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
    "wcds-button": WCDSButton;
  }
}
