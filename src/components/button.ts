/** @format */

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type Icon } from "../types";
import globalStyles from "../index.css?inline";

import "./icon";
import "../index.css";

@customElement("wcds-button")
export class WCDSButton extends LitElement {
  static styles = [unsafeCSS(globalStyles)];

  @property({ type: String })
  iconLeft?: Icon;

  @property({ type: String })
  iconRight?: Icon;

  render() {
    return html`
      <button data-theme="caramellatte" class="btn uppercase btn-primary">
        <span class="flex gap-2 items-center">
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
