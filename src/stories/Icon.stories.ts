import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import { ICONS, SIZE } from '../constants';

import '../components/icon';

const { events, args, argTypes, template } = getStorybookHelpers('wcds-icon');

const meta: Meta = {
  title: 'Components/Icon',
  component: 'wcds-icon',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: (args) => template(args),
  args: {
    icon: 'check',
    size: 'md',
  },
  argTypes: {
    icon: {
      control: { type: 'select' },
      options: ICONS,
    },
    size: { control: { type: 'select' }, options: SIZE },
  },
};

export const AllIcons = () => {
  return html`
    <div
      style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem;"
    >
      ${ICONS.map(
        (icon) => html`
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <wcds-icon icon=${icon} size="lg"></wcds-icon>
            <small style="font-size: 0.75rem; text-align: center;">${icon}</small>
          </div>
        `
      )}
    </div>
  `;
};
