/** @format */

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../src/tokens/generated/design-tokens.css';
import { baseStyles } from '../styles/base';

/**
 * @tagname wcds-card
 * @summary Container card with header/body/footer slots, size and variant styles.
 * @slot header - Optional header content (title, actions).
 * @slot - Default body content.
 * @slot footer - Optional footer content (buttons, meta).
 * @cssproperty --wcds-card-padding - Padding inside the card.
 * @cssproperty --wcds-card-radius - Border radius of the card.
 * @cssproperty --wcds-card-bg-color - Background color.
 * @cssproperty --wcds-card-border-color - Border color (outlined/plain).
 * @cssproperty --wcds-card-shadow - Box shadow (elevated).
 */
@customElement('wcds-card')
export class WCDSCard extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
      display: block;
      box-sizing: border-box;
      transition: box-shadow 0.3s ease-in-out;

      --wcds-card-padding: var(--wcds-card-padding-default);
      --wcds-card-radius: var(--wcds-card-border-radius-default);
      --wcds-card-bg-color: var(--wcds-card-background-color-default);
      --wcds-card-border-color: var(--wcds-card-border-color-default);
      --wcds-card-shadow: var(--wcds-card-shadow-plain);
    }

    .card {
      display: flex;
      align-items: center;
      gap: var(--wcds-spacing-lg);
      padding: var(--wcds-card-padding);
      box-sizing: border-box;
      background-color: var(--wcds-card-bg-color);
      border: 1px solid var(--wcds-card-border-color);
      border-radius: var(--wcds-card-radius);
      box-shadow: var(--wcds-card-shadow);
      min-height: 64px;
    }

    .header,
    .footer {
      display: block;
    }
    .content {
      display: flex;
      flex: 1;
    }
  `,
  ];

  render() {
    return html`
      <div class="card">
        <slot name="header" class="header"></slot>
        <slot class="content"></slot>
        <slot name="footer" class="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcds-card': WCDSCard;
  }
}
