/** @format */

import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import type { WCDSCard } from '../components/card';
import '../components/card';
import '../components/button';
import '../components/avatar';
import { CARD_VARIANT, SIZE } from '../constants';
import { html } from 'lit';

const { events, args, argTypes, template } = getStorybookHelpers('wcds-card');

type StoryArgs = WCDSCard & typeof args;

const meta: Meta<WCDSCard> = {
  title: 'Components/Card',
  component: 'wcds-card',
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

export const Playground: Story = {
  render: (args) => template(args, html` ${headerExample} ${contentExample} ${footerExample}`),
};

const headerExample = html`
  <div
    slot="header"
    style="display: flex; flex-direction: column; align-items: center; background-color: #ffffff; padding: 0.5rem 1.25rem; border-radius: 1rem;"
  >
    <h2 style="margin: 0;">12</h2>
    <span>OCT</span>
  </div>
`;

const contentExample = html`
  <div style="display: flex; flex-direction: column; align-items: flex-start;">
    <h2 style="margin: 0;">Jazz Night Live</h2>
    <span style="display: flex; align-items: center; gap: 0.5rem;"
      ><wcds-icon icon="location"></wcds-icon>Blue Note Club</span
    >
    <span> 8:00 PM - Friday </span>
  </div>
`;

const footerExample = html`
  <span slot="footer">
    <wcds-button style="--wcds-button-radius: 1rem;">Buy for $45</wcds-button>
  </span>
`;
