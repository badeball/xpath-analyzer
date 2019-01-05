import { NODE_TYPES } from "../node_type";

export function isValid (type) {
  for (var i = 0; i < NODE_TYPES.length; i++) {
    if (NODE_TYPES[i] === type) {
      return true;
    }
  }

  return false;
}
