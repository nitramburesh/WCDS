export const ICONS = [
  "arrow-left",
  "arrow-right",
  "check",
  "close",
  "menu",
  "search",
] as const;

export type Icon = (typeof ICONS)[number];
