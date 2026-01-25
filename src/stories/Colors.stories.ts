import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import * as tokens from '../tokens/generated/design-tokens.js';
import { repeat } from 'lit/directives/repeat.js';

import '../components/color';
import '../components/icon';

const meta: Meta = {
  title: 'Theme/Colors',
  component: 'wcds-color',
};
export default meta;

export const Palette = () => {
  const tokenArray = Object.entries(tokens.default.color);
  const colorGroups = tokenArray.map(([tokenGroup, values]) => {
    const valuesArray = Object.entries(values);
    return html` <div>
      <h2>${tokenGroup.toUpperCase()}</h2>
      <ul style="display: flex; gap: 12px;">
        ${repeat(
          valuesArray,
          ([token, value]) =>
            html` <li style="list-style: none;">
              <wcds-color color=${value} name=${token}></wcds-color>
            </li>`
        )}
      </ul>
    </div>`;
  });

  return html`${colorGroups}`;
};
