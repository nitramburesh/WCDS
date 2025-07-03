import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { type Name } from "../types";

@customElement("wcds-icon")
export class WCDSIcon extends LitElement {
  @property({ type: String }) name: Name = "default";
  render() {
    return html`<span class="wcds-icon"> ${this._getIcon(this.name)} </span>`;
  }

  private _getIcon(name: Name) {
    switch (name) {
      // icons will go here

      default:
        return html` <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>`;
    }
  }

  static styles = css`
    .wcds-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5em;
      height: 1.5em;
    }
  `;
}
