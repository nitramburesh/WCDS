/** @format */

export const throwInvalidAttributeError = (attribute: string) => {
  throw new Error(`The ${attribute} attribute must be a valid attribute.`);
};

export const throwCustomError = (message: string) => {
  throw new Error(message);
};

export const isInvalidString = (value: unknown) =>
  typeof value !== "string" || value === "";

export const isInvalidNumber = (value: unknown) =>
  typeof value !== "number" || isNaN(value);

export const isInvalidBoolean = (value: unknown) => typeof value !== "boolean";
