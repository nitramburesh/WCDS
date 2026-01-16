/** @format */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Size, Icon } from '../types';
import { getRandomComponentId, isInvalidString, throwInvalidAttributeError } from '../utils/';
import './icon';
import '../../src/tokens/generated/design-tokens.css';

/**
 * @tagname wcds-input
 * @summary A customizable input component with label, icons, validation, and error display.
 * @fires input - Emitted on input with { value }.
 * @fires clear-error - Emitted when the user starts typing to clear existing errors.
 * @cssproperty --wcds-input-padding - Padding inside the input field.
 * @cssproperty --wcds-input-border-radius - Border radius of the input field.
 * @cssproperty --wcds-input-border-color-default - Border color of the input field.
 * @cssproperty --wcds-input-border-color-focus - Outline color of the input field on focus.
 * @cssproperty --wcds-input-box-shadow - Box shadow of the input field on focus.
 */

@customElement('wcds-input')
export class WCDSInput extends LitElement {
  @property({ type: String, reflect: true })
  id: string = getRandomComponentId('input');

  @property({ type: String })
  value = '';

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: String })
  label?: string;

  @property({ type: String })
  placeholder?: string;

  @property({ type: String })
  icon?: Icon;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  error?: string;

  private onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );

    if (this.error) this.dispatchEvent(new CustomEvent('clear-error'));
  }

  static styles = css`
    :host {
      --wcds-input-padding: var(--wcds-button-size-md-padding);
      --wcds-input-border-radius: var(--wcds-input-text-border-radius);
      --wcds-input-border-color-default: var(--wcds-input-text-border-color-default);
      --wcds-input-border-color-focus: var(--wcds-input-text-border-color-focus);
      --wcds-input-box-shadow: 5px 5px 14px #ced8d7, -2px -2px 14px #ffffff;
    }

    input {
      padding: calc(1.2 * var(--wcds-input-padding));
      border-radius: var(--wcds-input-border-radius);
      border: 1px solid var(--wcds-input-border-color-default);
      box-shadow: none;
      transition: box-shadow 0.3s ease-out, border-color 0.3s ease-out;
      /* padding-left: calc(2 * var(--wcds-input-padding) + var(--wcds-icon-size-md)); */
    }
    :host(:has(wcds-icon)) input {
      padding-left: calc(2 * var(--wcds-input-padding) + var(--wcds-icon-size-md));
    }

    input:focus {
      outline: none;
      border-color: var(--wcds-input-border-color-focus);
      box-shadow: var(--wcds-input-box-shadow);
      transition: box-shadow 0.3s ease-out, border-color 0.3s ease-in-out;
    }

    :host([size='sm']) input {
      --wcds-input-padding: var(var(--wcds-input-padding), var(--wcds-input-text-size-sm-padding));
      /* padding-left: calc(2 * var(--wcds-input-padding) + var(--wcds-icon-size-sm)); */
    }

    :host([size='sm']) wcds-icon {
      --wcds-icon-size: var(--wcds-icon-size-sm);
    }

    :host([size='lg']) input {
      --wcds-input-padding: var(var(--wcds-input-padding), var(--wcds-input-text-size-lg-padding));
      /* padding-left: calc(2 * var(--wcds-input-padding) + var(--wcds-icon-size-md)); */
    }

    :host([size='lg']) wcds-icon {
      left: calc(1.5 * var(--wcds-input-padding));
    }

    label {
      display: none;
    }

    .field {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    wcds-icon {
      position: absolute;
      top: 50%;
      left: var(--wcds-input-padding);
      transform: translateY(-50%);
    }
  `;

  render() {
    try {
      return html`
        
          <div class="field">
            ${this.icon ? html`<span class="icon"><wcds-icon .icon=${this.icon} /></span>` : null}

<input
@input=${this.onInput}

.value=${this.value}
?disabled=${this.disabled}
.id=${this.id}
.placeholder=${this.placeholder ?? ' '}
aria-invalid=${this.error ? 'true' : 'false'}
type="text"
/>
<label for=${this.id}>${this.label}</label>
</div>

<span class="error-text">${this.error ?? ''}</span>
</div>
      `;
    } catch (error) {
      console.error(error);
      return html`<div class="error-box">Error: ${(error as Error).message}</div>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcds-input': WCDSInput;
  }
}
