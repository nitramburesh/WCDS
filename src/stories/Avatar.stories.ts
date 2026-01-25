/** @format */

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import type { WCDSAvatar } from '../components/avatar';
import '../components/avatar';
import { AVATAR_VARIANT, SIZE } from '../constants';

const { events, args, argTypes, template } = getWcStorybookHelpers('wcds-avatar');

type StoryArgs = WCDSAvatar & typeof args;

const meta: Meta<WCDSAvatar> = {
  title: 'Components/Avatar',
  component: 'wcds-avatar',
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
    src: 'https://i.pravatar.cc/200?img=5',
    name: 'Alex Doe',
    alt: 'Alex Doe',
    variant: 'circular',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: AVATAR_VARIANT,
    },
    size: {
      control: { type: 'select' },
      options: SIZE,
    },
    src: { control: 'text' },
    name: { control: 'text' },
    alt: { control: 'text' },
  },
};
