/** @format */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../../src/tokens/generated/design-tokens.css';

/**
 * @tagname wcds-badge
 * @summary Small status badge with four variants.
 * @slot - Badge text/content.
 * @cssproperty --wcds-badge-padding - Inner padding.
 * @cssproperty --wcds-badge-radius - Border radius.
 * @cssproperty --wcds-badge-font-size - Font size.
 * @cssproperty --wcds-badge-bg - Background color.
 * @cssproperty --wcds-badge-fg - Text color.
 */
@customElement('wcds-badge')
export class WCDSBadge extends LitElement {
  @property({ type: String, reflect: true }) variant: 'info' | 'success' | 'warning' | 'error' =
    'info';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      --wcds-badge-padding: var(--wcds-badge-appearance-padding-vertical)
        var(--wcds-badge-appearance-padding-horizontal);
      --wcds-badge-radius: var(--wcds-badge-appearance-radius);
      --wcds-badge-font-size: var(--wcds-badge-appearance-font-size);
      --wcds-badge-bg: var(--wcds-badge-variant-info-bg);
      --wcds-badge-fg: var(--wcds-badge-variant-info-fg);
    }

    :host([variant='success']) {
      --wcds-badge-bg: var(--wcds-badge-variant-success-bg);
      --wcds-badge-fg: var(--wcds-badge-variant-success-fg);
    }

    :host([variant='warning']) {
      --wcds-badge-bg: var(--wcds-badge-variant-warning-bg);
      --wcds-badge-fg: var(--wcds-badge-variant-warning-fg);
    }

    :host([variant='error']) {
      --wcds-badge-bg: var(--wcds-badge-variant-error-bg);
      --wcds-badge-fg: var(--wcds-badge-variant-error-fg);
    }

    .badge {
      padding: var(--wcds-badge-padding);
      border-radius: var(--wcds-badge-radius);
      font-size: var(--wcds-badge-font-size);
      background: var(--wcds-badge-bg);
      color: var(--wcds-badge-fg);
      border: 1px solid color-mix(in srgb, var(--wcds-badge-fg) 25%, transparent);
      font-weight: 600;
      line-height: 1;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }
  `;

  render() {
    return html` <span class="badge">
      <slot></slot>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcds-badge': WCDSBadge;
  }
}
