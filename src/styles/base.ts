/** @format */

import { css } from 'lit';

/**
 * Base styles applied to all WCDS components.
 * Import and spread into your component's `static styles` array.
 *
 * @example
 * static styles = [baseStyles, css`...component specific styles...`];
 */
export const baseStyles = css`
  :host {
    font-family: var(
      --wcds-font-family-sans,
      'Plus Jakarta Sans',
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      sans-serif
    );
    font-weight: var(--wcds-font-weight-regular, 400);
    line-height: var(--wcds-font-line-height-normal, 1.5);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;
