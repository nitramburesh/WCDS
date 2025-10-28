/** @format */

export const throwError = (attribute: string) => {
  throw new Error(`The ${attribute} attribute must be a valid attribute.`);
};

export const isInvalidString = (value: unknown): boolean =>
  typeof value !== "string" || value === "";

export const isInvalidNumber = (value: unknown): boolean =>
  typeof value !== "number" || isNaN(value);

export const isInvalidBoolean = (value: unknown): boolean =>
  typeof value !== "boolean";
