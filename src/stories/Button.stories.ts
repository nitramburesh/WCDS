/** @format */

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { WCDSButton } from "../components/button";
import { html } from "lit";



const { events, args, argTypes, template } =
  getWcStorybookHelpers("wcds-button");

type StoryArgs = WCDSButton & typeof args 

const meta: Meta<StoryArgs> = {
  title: "Components/WCDSButton",
  component: "wcds-button",
  args: {
    ...args, 
    slot: 'BUTTON',
  },
  argTypes: argTypes as any,
  parameters: {
    actions: {
      handles: events,
    },
  },
};
export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: (args)=> template(args, html`${args.slot}`),
};


