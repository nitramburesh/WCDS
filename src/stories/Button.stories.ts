/** @format */

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { getWcStorybookHelpers } from "wc-storybook-helpers";

import { WCDSButton } from "../components/button";
import { html } from "lit";

const { events, args, argTypes, template } =
  getWcStorybookHelpers("wcds-button");

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

type Story = StoryObj<WCDSButton & typeof args>;

export const Default: Story = {
  render: (args) => template(args, html`<span>${args.label}</span>`),
  args: {
    label: "Button",
  },
  argTypes: {
    label: { control: "text" },
  },
};

// type CustomArguments = {
//   label: string;
//   iconRight: boolean;
//   iconLeft: boolean;
// };

// const meta: Meta<CustomArguments> = {
//   title: "Components/Button",
//   component: "wcds-button",
//   render: ({ label, iconLeft, iconRight }) => html`<wcds-button
//     iconLeft=${iconLeft ? "close" : null}
//     iconRight=${iconRight ? "close" : null}
//     label=${label}
//     id="button-1"
//     variant="primary"
//   ></wcds-button>`,
// };

// type Story = StoryObj<CustomArguments>;

// export const Primary: Story = {
//   args: {
//     label: "Button",
//     iconLeft: false,
//     iconRight: false,
//   },
// };
