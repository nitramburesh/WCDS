/** @format */

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getWcStorybookHelpers } from 'wc-storybook-helpers';

import type { WCDSButton } from '../components/button';
import { BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT, ICONS } from '../constants';

import '../components/button';

const { events, args, argTypes, template } = getWcStorybookHelpers('wcds-button');

type StoryArgs = WCDSButton & typeof args;

const meta: Meta<WCDSButton> = {
  title: 'Components/Button',
  component: 'wcds-button',
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
  // render: (args) =>
  //   html`
  //     <wcds-button
  //       .size=${args.size}
  //       .variant=${args.variant}
  //       .type=${args.type}
  //       ?disabled=${args.disabled}
  //       .iconLeft=${args.iconLeft}
  //       .iconRight=${args.iconRight}
  //     >
  //       ${args["default-slot"]}
  //     </wcds-button>
  //   `,
  render: (args) => template(args),
  args: {
    'default-slot': 'Button',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: BUTTON_SIZE,
    },
    variant: {
      control: { type: 'select' },
      options: BUTTON_VARIANT,
    },
    type: {
      control: { type: 'select' },
      options: BUTTON_TYPE,
    },
    iconLeft: { control: { type: 'select' }, options: ICONS },
    iconRight: { control: { type: 'select' }, options: ICONS },
  },
};
