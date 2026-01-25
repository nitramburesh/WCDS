/** @format */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { AvatarVariant, Size } from '../types';
import '../../src/tokens/generated/design-tokens.css';

/**
 * @tagname wcds-avatar
 * @summary User avatar with image or initials and Material-like shapes.
 * @cssproperty --wcds-avatar-size - Overall size of the avatar.
 * @cssproperty --wcds-avatar-radius - Border radius for the avatar shape.
 * @cssproperty --wcds-avatar-bg - Background color for fallback initials.
 * @cssproperty --wcds-avatar-fg - Text color for fallback initials.
 * @cssproperty --wcds-avatar-font-size - Font size for fallback initials.
 */
@customElement('wcds-avatar')
export class WCDSAvatar extends LitElement {
  @property({ type: String }) src?: string;
  @property({ type: String }) alt?: string;
  @property({ type: String }) name?: string;
  @property({ type: String, reflect: true }) variant: AvatarVariant = 'circular';
  @property({ type: String, reflect: true }) size: Size = 'md';

  @state() private imageError = false;

  private handleError() {
    this.imageError = true;
  }

  private get fallbackText(): string {
    const source = this.name ?? this.alt;

    if (!source) return '?';

    const initials = source
      .trim()
      .split(/\s+/)
      .map((part) => part[0] ?? '')
      .join('')
      .slice(0, 2)
      .toUpperCase();
    return initials || '?';
  }

  static styles = css`
    :host {
      --wcds-avatar-size: var(--wcds-avatar-size-md);
      --wcds-avatar-radius: var(--wcds-avatar-shape-circular);
      --wcds-avatar-bg: var(--wcds-avatar-bg-default);
      --wcds-avatar-fg: var(--wcds-avatar-fg-default);
      --wcds-avatar-font-size: var(--wcds-avatar-font-size-md);

      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }

    :host([variant='rounded']) {
      --wcds-avatar-radius: var(--wcds-avatar-shape-rounded);
    }

    :host([variant='square']) {
      --wcds-avatar-radius: var(--wcds-avatar-shape-square);
    }

    :host([size='sm']) {
      --wcds-avatar-size: var(--wcds-avatar-size-sm);
      --wcds-avatar-font-size: var(--wcds-avatar-font-size-sm);
    }

    :host([size='md']) {
      --wcds-avatar-size: var(--wcds-avatar-size-md);
      --wcds-avatar-font-size: var(--wcds-avatar-font-size-md);
    }

    :host([size='lg']) {
      --wcds-avatar-size: var(--wcds-avatar-size-lg);
      --wcds-avatar-font-size: var(--wcds-avatar-font-size-lg);
    }

    .avatar {
      width: var(--wcds-avatar-size);
      height: var(--wcds-avatar-size);
      border-radius: var(--wcds-avatar-radius);
      background: var(--wcds-avatar-bg);
      color: var(--wcds-avatar-fg);
      font-size: var(--wcds-avatar-font-size);
      font-weight: 600;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      user-select: none;
    }

    .avatar img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      border-radius: inherit;
    }

    .fallback {
      width: 100%;
      height: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `;

  render() {
    const showImage = Boolean(this.src) && !this.imageError;
    const label = this.alt ?? this.name ?? 'Avatar';

    return html`
      <div class="avatar" aria-label=${label} role="img">
        ${showImage
          ? html`<img src=${this.src!} alt=${label} @error=${this.handleError} />`
          : html`<div class="fallback"><slot>${this.fallbackText}</slot></div>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcds-avatar': WCDSAvatar;
  }
}
