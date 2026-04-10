# WCDS - Web Component Design System

A design system built with Lit web components.

## Installation

```bash
npm install @nitramburesh/wcds
# or
pnpm add @nitramburesh/wcds
```

## Setup

### 1. Import the library

```js
import '@nitramburesh/wcds';
import '@nitramburesh/wcds/style';
```

### 2. Add the Plus Jakarta Sans font (recommended)

WCDS is designed to work with the [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) font family. Add it to your project:

**Option A: Google Fonts (easiest)**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**Option B: Self-hosted via Fontsource**

```bash
npm install @fontsource-variable/plus-jakarta-sans
```

```js
import '@fontsource-variable/plus-jakarta-sans';
```

> **Note:** If Plus Jakarta Sans is not loaded, WCDS will gracefully fall back to system fonts (`system-ui`, `-apple-system`, etc.).

## Usage

```html
<wcds-button variant="primary">Click me</wcds-button>
<wcds-input placeholder="Enter text..."></wcds-input>
```

## Development

### Commands

#### `pnpm prepare`

- Generates design tokens for component library
- Run this command after every change to design tokens under `src/tokens/`

#### `pnpm dev`

- Starts Storybook development server

#### `pnpm build`

- Builds the library for production

#### `pnpm test`

- Runs all Vitest projects

#### `pnpm test:browser`

- Runs component behavior tests in a real Chromium browser (Playwright provider)

#### `pnpm test:storybook`

- Runs Storybook-backed tests (stories + addon-vitest)

## Testing strategy

WCDS already uses Chromatic + Storybook for visual regression. Add these layers:

1. **Component behavior tests (Vitest browser mode)**

   - Validate properties/attributes behavior
   - Validate emitted events (`click`, `input`, `change`)
   - Validate disabled and edge states

2. **Storybook tests (addon-vitest)**

   - Validate stories render and interactive story scenarios
   - Complements Chromatic by asserting behavior, not only visuals

3. **(Optional) Playwright e2e**
   - Add later when you have an app/sandbox page with multiple components wired together

### First-time Playwright setup

If browser tests fail with missing executable, install Playwright browsers once:

```bash
pnpm test:install-browsers
```
