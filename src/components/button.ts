/** @format */

import { LitElement, html, css } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { customElement, property } from "lit/decorators.js";
import { type Icon } from "../types";
import "./icon.js";
import "../../src/tokens/generated/design-tokens.css";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

/**
 * @tagname wcds-button
 */
@customElement("wcds-button")
export class WCDSButton extends LitElement {
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
      })
    );
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    .btn {
      --wcds-button-padding: var(--wcds-button-size-md-padding);
      --wcds-button-radius: var(--wcds-button-size-md-radius);
      --wcds-button-font-size: var(--wcds-button-size-md-font-size);
      --wcds-button-bg: var(--wcds-button-variant-primary-default-bg);
      --wcds-button-fg: var(--wcds-button-variant-primary-default-fg);
      --wcds-button-border-color: var(
        --wcds-button-variant-primary-border-color
      );
      padding: var(--wcds-button-padding);
      border-radius: var(--wcds-button-radius);
      font-size: var(--wcds-button-font-size);

      background-color: var(--wcds-button-bg);
      color: var(--wcds-button-fg);
      border: 1px solid var(--wcds-button-border-color);
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--wcds-spacing-xs);
      box-sizing: border-box;
    }

    .btn:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    .btn:hover {
      scale: 1.1;
      filter: brightness(1.5);
    }

    .btn--primary {
      --wcds-button-bg: var(--wcds-button-variant-primary-default-bg);
      --wcds-button-fg: var(--wcds-button-variant-primary-default-fg);
      --wcds-button-border-color: var(
        --wcds-button-variant-primary-border-color
      );
    }

    .btn--secondary {
      --wcds-button-bg: var(--wcds-button-variant-secondary-default-bg);
      --wcds-button-fg: var(--wcds-button-variant-secondary-default-fg);
      --wcds-button-border-color: var(
        --wcds-button-variant-secondary-border-color
      );
    }

    .btn--ghost {
      --wcds-button-bg: var(--wcds-button-variant-ghost-default-bg);
      --wcds-button-fg: var(--wcds-button-variant-ghost-default-fg);
      --wcds-button-border-color: var(--wcds-button-variant-ghost-border-color);
    }
  `;

  render() {
    const classes = {
      btn: true,
      [`btn--${this.variant}`]: true,
      [`btn--${this.size}`]: true,
    };
    return html`
      <button
        @click=${this.handleClick}
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled}
      >
        <span class="">
          ${this.iconLeft &&
          html`<wcds-icon .icon=${this.iconLeft} slot="icon-left" />`}
          <slot></slot>
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
