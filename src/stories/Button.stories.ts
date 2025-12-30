/** @format */

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { WCDSButton } from "../components/button";
import { html } from "lit";
import { BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT, ICONS } from "../constants";

const { events, args, argTypes, template } =
  getWcStorybookHelpers("wcds-button");

type StoryArgs = WCDSButton & typeof args;

const meta: Meta<WCDSButton> = {
  title: "Components/WCDSButton",
  component: "wcds-button",
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

export const Default: Story = {
  render: (args) => template(args),
  args: {
    "default-slot": "Button",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: BUTTON_SIZE,
    },
    variant: {
      control: { type: "select" },
      options: BUTTON_VARIANT,
    },
    type: {
      control: { type: "select" },
      options: BUTTON_TYPE,
    },
    iconLeft: { control: { type: "select" }, options: ICONS },
    iconRight: { control: { type: "select" }, options: ICONS },
  },
};
