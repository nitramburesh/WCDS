# WCDS - Web Component Design System

A design system built with Lit web components.

## Installation

```bash
npm install wcds
# or
pnpm add wcds
```

## Setup

### 1. Import the library

```js
import 'wcds'
import 'wcds/style'
```

### 2. Add the Plus Jakarta Sans font (recommended)

WCDS is designed to work with the [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) font family. Add it to your project:

**Option A: Google Fonts (easiest)**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Option B: Self-hosted via Fontsource**

```bash
npm install @fontsource-variable/plus-jakarta-sans
```

```js
import '@fontsource-variable/plus-jakarta-sans'
```

> **Note:** If Plus Jakarta Sans is not loaded, WCDS will gracefully fall back to system fonts (`system-ui`, `-apple-system`, etc.).

## Usage

```html
<wcds-button variant="primary">Click me</wcds-button>
<wcds-input placeholder="Enter text..."></wcds-input>
<wcds-badge variant="success">Active</wcds-badge>
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
