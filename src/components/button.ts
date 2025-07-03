import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { type Name } from "../types";
import "./icon";
import "../index.css";

@customElement("wcds-button")
export class WCDSButton extends LitElement {
  iconLeft?: Name;
  iconRight?: Name;

  static get properties() {
    return {
      iconLeft: { type: String },
      iconRight: { type: String },
    };
  }
  constructor() {
    super();
  }

  render() {
    console.log(this.iconLeft);
    return html`
      <button class="wcds-button">
        ${this.iconLeft &&
        html`<wcds-icon name="${this.iconLeft}" slot="icon-left" />`}

        <slot></slot>

        ${this.iconRight &&
        html`<wcds-icon name="${this.iconRight}" slot="icon-right" />`}
      </button>
    `;
  }

  static styles = css`
    ::slotted() {
      font-size: 3.2em;
      line-height: 1.1;
    }

    button {
      border-radius: 32px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      color: #ffffff;
      cursor: pointer;
      transition: border-color 0.25s;
      display: flex;
      gap: 0.5em;
      align-items: center;
      justify-content: center;
      height: 3em;
      text-transform: uppercase;
    }

    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "wcds-button": WCDSButton;
  }
}
