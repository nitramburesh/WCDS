/** @format */

import '../src/tokens/generated/design-tokens.css';
import type { Preview } from '@storybook/web-components-vite';
import { setCustomElementsManifest } from '@storybook/web-components-vite';
import { setStorybookHelpersConfig, type Options } from '@wc-toolkit/storybook-helpers';
import customElements from '../custom-elements.json';

setCustomElementsManifest(customElements);
setStorybookHelpersConfig({ hideArgRef: true });

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      customElements,
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
