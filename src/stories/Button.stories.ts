import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { WCDSButton } from "../components/button";
import "../components/icon";

const meta: Meta = {
  title: "Components/Button",
  component: "wcds-button",
  argTypes: {
    label: { control: "text" },
    iconRight: { control: "boolean" },
    iconLeft: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof WCDSButton>;

const Template = ({
  label,
  iconLeft,
  iconRight,
}: {
  label: string;
  iconLeft: boolean;
  iconRight: boolean;
}) =>
  html`<wcds-button
    iconLeft=${iconLeft ? "default" : null}
    iconRight=${iconRight ? "default" : null}
  >
    ${label}
  </wcds-button>`;

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary",
  iconRight: false,
  iconLeft: false,
};
