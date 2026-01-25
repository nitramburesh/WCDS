/** @format */

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import type { WCDSBadge } from '../components/badge';

import '../components/badge';

const { events, args, argTypes, template } = getStorybookHelpers('wcds-badge');

type StoryArgs = WCDSBadge & typeof args;

const meta: Meta<WCDSBadge> = {
  title: 'Components/Badge',
  component: 'wcds-badge',
  args,
  argTypes,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
  render: (args) => template(args),
  args: {
    'default-slot': 'Badge example',
  },
  argTypes: {},
};
