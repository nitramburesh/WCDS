import { html } from 'lit';
import type { Meta } from '@storybook/web-components-vite';
import { ICONS } from '../constants';

import '../components/icon';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'wcds-icon',
};

export default meta;

export const Icons = () => {
  return html`
    ${ICONS.map(
      (icon) => html`
        <div>
          <h2>${icon}</h2>
          <wcds-icon icon="${icon}"></wcds-icon>
        </div>
      `
    )}
  `;
};
