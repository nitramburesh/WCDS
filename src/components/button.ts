/** @format */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Icon, ButtonType, ButtonVariant, Size, ColorScheme } from '../types';
import './icon';
import '../../src/tokens/generated/design-tokens.css';
import { getRandomComponentId } from '../utils';
import { baseStyles } from '../styles/base';

/**
 * @tagname wcds-button
 * @summary A customizable button component with support for icons and various styles.
 * @slot - The button's label or content.
 * @fires click - Emitted when the button is clicked.
 * @cssproperty --wcds-button-padding - Padding inside the button.
 * @cssproperty --wcds-button-radius - Border radius of the button.
 * @cssproperty --wcds-button-font-size - Font size of the button label.
 * @cssproperty --wcds-button-bg-color - Background color of the button.
 * @cssproperty --wcds-button-fg-color - Text color of the button.
 * @cssproperty --wcds-button-border-color - Border color of the button.
 * @cssproperty --wcds-button-icon-size - Size of icons inside the button.
 */
@customElement('wcds-button')
export class WCDSButton extends LitElement {
  @property({ type: String, reflect: true }) id: string = getRandomComponentId('button');
  @property({ type: String, reflect: true }) size: Size = 'sm';
  @property({ type: String, reflect: true }) variant: ButtonVariant = 'solid';
  @property({ type: String, reflect: true, attribute: 'color-scheme' }) colorScheme: ColorScheme = 'primary';
  @property({ type: String, reflect: true }) type: ButtonType = 'button';
  @property({ type: String }) iconLeft?: Icon;
  @property({ type: String }) iconRight?: Icon;
  @property({ type: Boolean, reflect: true }) disabled = false;

  private handleClick(event: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('click', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    );
  }

  static styles = [
    baseStyles,
    css`
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: var(--wcds-button-padding);
        border-radius: var(--wcds-button-radius);
        font-size: var(--wcds-button-font-size);
        font-weight: 500;
        background-color: var(--wcds-button-bg-color);
        color: var(--wcds-button-fg-color);
        border: 1px solid var(--wcds-button-border-color);
        gap: var(--wcds-spacing-xs);
        cursor: pointer;
        transition: all 0.15s ease-out;
        box-sizing: border-box;
        text-transform: uppercase;
        letter-spacing: 0.02em;
      }

      button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      button:not([disabled]):hover {
        filter: brightness(1.1);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }

      button:not([disabled]):active {
        transform: scale(0.98);
        box-shadow: none;
      }

      /* Solid variant */
      :host([variant='solid'][color-scheme='primary']),
      :host([variant='solid']:not([color-scheme])),
      :host(:not([variant])[color-scheme='primary']),
      :host(:not([variant]):not([color-scheme])) {
        --wcds-button-bg-color: var(--wcds-button-solid-primary-bg);
        --wcds-button-fg-color: var(--wcds-button-solid-primary-fg);
        --wcds-button-border-color: var(--wcds-button-solid-primary-border);
      }

      :host([variant='solid'][color-scheme='secondary']),
      :host(:not([variant])[color-scheme='secondary']) {
        --wcds-button-bg-color: var(--wcds-button-solid-secondary-bg);
        --wcds-button-fg-color: var(--wcds-button-solid-secondary-fg);
        --wcds-button-border-color: var(--wcds-button-solid-secondary-border);
      }

      :host([variant='solid'][color-scheme='neutral']),
      :host(:not([variant])[color-scheme='neutral']) {
        --wcds-button-bg-color: var(--wcds-button-solid-neutral-bg);
        --wcds-button-fg-color: var(--wcds-button-solid-neutral-fg);
        --wcds-button-border-color: var(--wcds-button-solid-neutral-border);
      }

      /* Outlined variant */
      :host([variant='outlined'][color-scheme='primary']),
      :host([variant='outlined']:not([color-scheme])) {
        --wcds-button-bg-color: var(--wcds-button-outlined-primary-bg);
        --wcds-button-fg-color: var(--wcds-button-outlined-primary-fg);
        --wcds-button-border-color: var(--wcds-button-outlined-primary-border);
      }

      :host([variant='outlined'][color-scheme='primary']) button:not([disabled]):hover,
      :host([variant='outlined']:not([color-scheme])) button:not([disabled]):hover {
        background-color: var(--wcds-button-outlined-primary-bg-hover);
      }

      :host([variant='outlined'][color-scheme='secondary']) {
        --wcds-button-bg-color: var(--wcds-button-outlined-secondary-bg);
        --wcds-button-fg-color: var(--wcds-button-outlined-secondary-fg);
        --wcds-button-border-color: var(--wcds-button-outlined-secondary-border);
      }

      :host([variant='outlined'][color-scheme='secondary']) button:not([disabled]):hover {
        background-color: var(--wcds-button-outlined-secondary-bg-hover);
      }

      :host([variant='outlined'][color-scheme='neutral']) {
        --wcds-button-bg-color: var(--wcds-button-outlined-neutral-bg);
        --wcds-button-fg-color: var(--wcds-button-outlined-neutral-fg);
        --wcds-button-border-color: var(--wcds-button-outlined-neutral-border);
      }

      :host([variant='outlined'][color-scheme='neutral']) button:not([disabled]):hover {
        background-color: var(--wcds-button-outlined-neutral-bg-hover);
      }

      /* Ghost variant */
      :host([variant='ghost'][color-scheme='primary']),
      :host([variant='ghost']:not([color-scheme])) {
        --wcds-button-bg-color: var(--wcds-button-ghost-primary-bg);
        --wcds-button-fg-color: var(--wcds-button-ghost-primary-fg);
        --wcds-button-border-color: var(--wcds-button-ghost-primary-border);
      }

      :host([variant='ghost'][color-scheme='primary']) button:not([disabled]):hover,
      :host([variant='ghost']:not([color-scheme])) button:not([disabled]):hover {
        background-color: var(--wcds-button-ghost-primary-bg-hover);
      }

      :host([variant='ghost'][color-scheme='secondary']) {
        --wcds-button-bg-color: var(--wcds-button-ghost-secondary-bg);
        --wcds-button-fg-color: var(--wcds-button-ghost-secondary-fg);
        --wcds-button-border-color: var(--wcds-button-ghost-secondary-border);
      }

      :host([variant='ghost'][color-scheme='secondary']) button:not([disabled]):hover {
        background-color: var(--wcds-button-ghost-secondary-bg-hover);
      }

      :host([variant='ghost'][color-scheme='neutral']) {
        --wcds-button-bg-color: var(--wcds-button-ghost-neutral-bg);
        --wcds-button-fg-color: var(--wcds-button-ghost-neutral-fg);
        --wcds-button-border-color: var(--wcds-button-ghost-neutral-border);
      }

      :host([variant='ghost'][color-scheme='neutral']) button:not([disabled]):hover {
        background-color: var(--wcds-button-ghost-neutral-bg-hover);
      }

      /* Icon styling */
      wcds-icon {
        --wcds-icon-size: var(--wcds-button-icon-size, 1em);
        color: inherit;
      }

      /* Size: sm */
      :host([size='sm']) {
        --wcds-button-padding: var(--wcds-button-size-sm-padding)
          calc(var(--wcds-button-size-sm-padding) * 2);
        --wcds-button-radius: var(--wcds-button-size-sm-radius);
        --wcds-button-font-size: var(--wcds-button-size-sm-font-size);
        --wcds-button-icon-size: var(--wcds-button-size-sm-icon-size);
      }

      /* Size: md */
      :host([size='md']) {
        --wcds-button-padding: var(--wcds-button-size-md-padding);
        --wcds-button-radius: var(--wcds-button-size-md-radius);
        --wcds-button-font-size: var(--wcds-button-size-md-font-size);
        --wcds-button-icon-size: var(--wcds-button-size-md-icon-size);
      }

      /* Size: lg */
      :host([size='lg']) {
        --wcds-button-padding: var(--wcds-button-size-lg-padding);
        --wcds-button-radius: var(--wcds-button-size-lg-radius);
        --wcds-button-font-size: var(--wcds-button-size-lg-font-size);
        --wcds-button-icon-size: var(--wcds-button-size-lg-icon-size);
      }
    `,
  ];

  render() {
    return html`
      <button @click=${this.handleClick} type=${this.type} ?disabled=${this.disabled}>
        ${this.iconLeft && html`<wcds-icon .icon=${this.iconLeft} />`}
        <slot></slot>
        ${this.iconRight && html`<wcds-icon .icon=${this.iconRight} />`}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcds-button': WCDSButton;
  }
}
