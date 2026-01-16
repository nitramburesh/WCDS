/** @format */

import type { Meta, StoryObj } from '@storybook/web-components-vite';

import type { WCDSInput } from '../components/input';
import '../components/input';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';
import { ICONS, SIZE } from '../constants';

const { events, args, argTypes, template } = getWcStorybookHelpers('wcds-input');

type StoryArgs = WCDSInput & typeof args;

const meta: Meta<WCDSInput> = {
  title: 'Components/Input',
  component: 'wcds-input',
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
    id: 'wcds-input-1',
    label: 'Insert text',
    placeholder: 'Insert text...',
  },
  argTypes: {
    icon: { control: { type: 'select', default: '' }, options: ICONS },
    size: { control: { type: 'select' }, options: SIZE },
  },
};
