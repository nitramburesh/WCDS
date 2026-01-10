/** @format */

import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Icon, ButtonType, ButtonVariant, ButtonSize } from "../types";
import "./icon";
import "../../src/tokens/generated/design-tokens.css";

/**
 * @tagname wcds-button
 * @summary A customizable button component with support for icons and various styles.
 * @slot - The button's label or content.
 * @fires wcds-click - Emitted when the button is clicked.
 * @cssproperty --wcds-button-padding - Padding inside the button.
 * @cssproperty --wcds-button-radius - Border radius of the button.
 * @cssproperty --wcds-button-font-size - Font size of the button label.
 * @cssproperty --wcds-button-bg-color - Background color of the button.
 * @cssproperty --wcds-button-fg-color - Text color of the button.
 * @cssproperty --wcds-button-border-color - Border color of the button.
 */
@customElement("wcds-button")
export class WCDSButton extends LitElement {
  @property({ type: String, reflect: true }) size: ButtonSize = "md";
  @property({ type: String, reflect: true }) variant: ButtonVariant = "primary";
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
      })
    );
  }

  static styles = css`
    button {
      display: inline-block;
      padding: var(--wcds-button-padding);
      border-radius: var(--wcds-button-radius);
      font-size: var(--wcds-button-font-size);
      background-color: var(--wcds-button-bg-color);
      color: var(--wcds-button-fg-color);
      border: 1px solid var(--wcds-button-border-color);
      gap: var(--wcds-spacing-xs);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      text-transform: uppercase;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    button:not([disabled]):hover {
      scale: 1.02;
      filter: brightness(1.3);
      box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
    }

    button:not([disabled]):active {
      transform: scale(0.96);
    }

    :host {
      --wcds-button-padding: var(--wcds-button-size-md-padding);
      --wcds-button-radius: var(--wcds-button-size-md-radius);
      --wcds-button-font-size: var(--wcds-button-size-md-font-size);
      --wcds-button-bg-color: var(--wcds-button-variant-primary-default-bg);
      --wcds-button-fg-color: var(--wcds-button-variant-primary-default-fg);
      --wcds-button-border-color: var(
        --wcds-button-variant-primary-border-color
      );
    }

    :host([variant="secondary"]) {
      --wcds-button-bg-color: var(--wcds-button-variant-secondary-default-bg);
      --wcds-button-fg-color: var(--wcds-button-variant-secondary-default-fg);
      --wcds-button-border-color: var(
        --wcds-button-variant-secondary-border-color
      );
    }

    :host([variant="ghost"]) {
      --wcds-button-bg-color: var(--wcds-button-variant-ghost-default-bg);
      --wcds-button-fg-color: var(--wcds-button-variant-ghost-default-fg);
      --wcds-button-border-color: var(--wcds-button-variant-ghost-border-color);
    }

    :host([size="sm"]) {
      --wcds-button-padding: var(--wcds-button-size-sm-padding);
      --wcds-button-radius: var(--wcds-button-size-sm-radius);
      --wcds-button-font-size: var(--wcds-button-size-sm-font-size);
    }

    :host([size="lg"]) {
      --wcds-button-padding: var(--wcds-button-size-lg-padding);
      --wcds-button-radius: var(--wcds-button-size-lg-radius);
      --wcds-button-font-size: var(--wcds-button-size-lg-font-size);
    }
  `;

  render() {
    return html`
      <button
        @click=${this.handleClick}
        type=${this.type}
        ?disabled=${this.disabled}
      >
        ${this.iconLeft && html`<wcds-icon .icon=${this.iconLeft} />`}
        <slot></slot>
        ${this.iconRight && html`<wcds-icon .icon=${this.iconRight} />`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wcds-button": WCDSButton;
  }
}
