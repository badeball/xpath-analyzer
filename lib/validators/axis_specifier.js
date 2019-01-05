import { AXES } from "../axis_specifier";

export function isValid (specifier) {
  for (var i = 0; i < AXES.length; i++) {
    if (AXES[i] === specifier) {
      return true;
    }
  }

  return false;
}
