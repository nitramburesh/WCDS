/** @format */

import { html } from "lit";
import type { Meta } from "@storybook/web-components-vite";

import "../components/input";

const meta: Meta = {
  title: "Components/Input",
  component: "wcds-input",
};

export const Input = () => {
  return html`<wcds-input
    placeholder="Enter text"
    label="Input"
    id="input-1"
  ></wcds-input>`;
};
export default meta;
