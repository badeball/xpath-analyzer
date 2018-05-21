import { AXES } from "../axis_specifier";

export function isValid (specifier) {
  return AXES.includes(specifier);
}
