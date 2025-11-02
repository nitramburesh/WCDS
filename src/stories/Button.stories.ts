/** @format */

import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import "../components/button";

type CustomArguments = {
  label: string;
  iconRight: boolean;
  iconLeft: boolean;
};

const meta: Meta<CustomArguments> = {
  title: "Components/Button",
  component: "wcds-button",
  render: ({ label, iconLeft, iconRight }) => html`<wcds-button
    iconLeft=${iconLeft ? "close" : null}
    iconRight=${iconRight ? "close" : null}
    label=${label}
    id="button-1"
    variant="primary"
  ></wcds-button>`,
};

export default meta;

type Story = StoryObj<CustomArguments>;

export const Primary: Story = {
  args: {
    label: "Button",
    iconLeft: false,
    iconRight: false,
  },
};
