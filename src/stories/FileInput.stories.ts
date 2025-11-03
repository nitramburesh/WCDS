/** @format */

import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import "../components/file-input";

const meta: Meta = {
  title: "Components/File-Input",
  component: "wcds-file-input",
};

export const FileInput = () =>
  html`
    <wcds-file-input id="input-1" accept=".png, .jpg, .jpeg"></wcds-file-input>
  `;
export default meta;
