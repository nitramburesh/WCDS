<!-- @format -->

# WCDS

WCDS aka Web Component Design System is a package that thrives to solve problems for multi-framework teams. Providing components as web components, it strips the burden of framework specifities, allowing developers to focus on solving more important problems that just building components over and over again.

## Working on project

`pnpm install` - install dependencies

`pnpm dev` - prepare design tokens, run StoryBook and start developing

## Package management

1. commmit and push changes
2. bump npm package version

   - `npm version <new-version-number>`

3. pack latest package version

   - `pnpm pack`

4. publish npm package

   - `npm publish`

## Techstack

### Lit

Components are built using Lit framework in order to be web components and reusable wherever.

### Vite

This project utilizes Vite as tooling.

### StoryBook

StoryBook helps to visualize components for development, presentation and testing purposes.
