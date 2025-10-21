import { html } from "lit";
import type { Meta } from "@storybook/web-components-vite";
import { tokens } from "../tokens/generated/tokens";
import { repeat } from "lit/directives/repeat.js";

import "../components/color";
import "../components/icon";

const meta: Meta = {
  title: "Theme/Colors",
  component: "wcds-color",
};
export default meta;

export const Palette = () => {
  const tokenArray = Object.entries(tokens.color);
  const colorGroups = tokenArray.map(([tokenGroup, values]) => {
    const valuesArray = Object.entries(values);
    return html` <div>
      <h2>${tokenGroup.toUpperCase()}</h2>
      <ul style="display: flex; gap: 16px;">
        ${repeat(
          valuesArray,
          ([token, value]) =>
            html` <li style="list-style: none;">
              <wcds-color color=${value} name=${token} />
            </li>`
        )}
      </ul>
    </div>`;
  });

  return html`${colorGroups}`;
};
