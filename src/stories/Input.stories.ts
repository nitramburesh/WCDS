/** @format */

import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import "../components/input";

type CustomArguments = {
  label: string;
  icon: boolean;
  type: string;
  accept: string;
};

const meta: Meta<CustomArguments> = {
  title: "Components/Input",
  component: "wcds-input",
  render: ({ label, icon, type, accept }) =>
    html`
      <wcds-input
        id="input-1"
        label=${label}
        icon=${icon ? "close" : null}
        type=${type}
        accept=${accept}
      ></wcds-input>
    `,
};

export default meta;

type Story = StoryObj<CustomArguments>;

export const Default: Story = {
  args: {
    label: "Input",
    icon: false,
    type: "text",
    accept: "",
  },
};
