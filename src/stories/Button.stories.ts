import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import "../components/icon";
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
    iconLeft=${iconLeft ? "default" : null}
    iconRight=${iconRight ? "default" : null}
  >
    ${label}
  </wcds-button>`,
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
