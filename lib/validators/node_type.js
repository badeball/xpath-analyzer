import {
  COMMENT,
  NODE,
  PROCESSING_INSTRUCTION,
  TEXT
} from "../node_type";

export function isValid (type) {
  return type == COMMENT ||
    type == NODE ||
    type == PROCESSING_INSTRUCTION ||
    type == TEXT;
}
