/** @format */

import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { Size, type Icon } from '../types';

const ICONS: Record<Icon, TemplateResult> = {
  'arrow-left': html` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20 12H4m0 0 6-6m-6 6 6 6"
    />
  </svg>`,

  'arrow-right': html` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 12h14m0 0-6-6m6 6-6 6"
    />
  </svg>`,

  check: html`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  `,

  close: html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
      />
    </svg>
  `,

  menu: html`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="currentColor" d="M3 18v-2h18v2H3Zm0-5v-2h18v2H3Zm0-5V6h18v2H3Z" />
    </svg>
  `,

  search: html`
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
};

@customElement('wcds-icon')
export class WCDSIcon extends LitElement {
  @property({ type: String, reflect: true }) icon!: Icon;
  @property({ type: String }) size: Size = 'md';

  static styles = css`
    :host {
      --wcds-icon-size: var(--wcds-icon-size-md);
      --wcds-icon-color: var(--wcds-icon-color-neutral);

      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--wcds-icon-size);
      height: var(--wcds-icon-size);
      line-height: 0;
    }

    .wcds-icon {
      display: inline-flex;
      width: 100%;
      height: 100%;
    }

    svg path {
      width: 100%;
      height: 100%;
    }
  `;

  render() {
    const svg: TemplateResult | undefined = ICONS[this.icon];
    if (!svg) return null;

    return html` <span class="wcds-icon" role="img" aria-hidden="true"> ${svg} </span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcds-icon': WCDSIcon;
  }
}
