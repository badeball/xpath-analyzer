import { NODE_TYPES } from "../node_type";

export function isValid (type) {
  return NODE_TYPES.includes(type);
}
