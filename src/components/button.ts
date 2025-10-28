/** @format */

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type Icon } from "../types";
import globalStyles from "../index.css?inline";

import "./icon";
import "../index.css";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";
@customElement("wcds-button")
export class WCDSButton extends LitElement {
  static styles = [unsafeCSS(globalStyles)];

  @property({ type: String }) label = "";
  @property({ type: String }) size: ButtonSize = "md";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String, reflect: true }) variant: ButtonVariant = "primary";
  @property({ type: String }) type: ButtonType = "button";
  @property({ type: String }) iconLeft?: Icon;
  @property({ type: String, reflect: true }) iconRight?: Icon;

  private handleClick(event: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent("wcds-click", {
        detail: event,
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <button
        @click=${this.handleClick}
        class="btn uppercase btn-${this.variant}"
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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wcds-button": WCDSButton;
  }
}
