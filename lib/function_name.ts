import { NUMBER } from "./expr_type";

export const BOOLEAN = "boolean";
export const CEILING = "ceiling";
export const CONCAT = "concat";
export const CONTAINS = "contains";
export const COUNT = "count";
export const FALSE = "false";
export const FLOOR = "floor";
export const ID = "id";
export const LAST = "last";
export const LOCAL_NAME = "local-name";
export const NAME = "name";
export const NORMALIZE_SPACE = "normalize-space";
export const NOT = "not";
export const POSITION = "position";
export const ROUND = "round";
export const STARTS_WITH = "starts-with";
export const STRING_LENGTH = "string-length";
export const STRING = "string";
export const SUBSTRING_AFTER = "substring-after";
export const SUBSTRING_BEFORE = "substring-before";
export const SUBSTRING = "substring";
export const SUM = "sum";
export const TRANSLATE = "translate";
export const TRUE = "true";

export type FunctionName =
  typeof BOOLEAN |
  typeof CEILING |
  typeof CONCAT |
  typeof CONTAINS |
  typeof COUNT |
  typeof FALSE |
  typeof FLOOR |
  typeof ID |
  typeof LAST |
  typeof LOCAL_NAME |
  typeof NAME |
  typeof NORMALIZE_SPACE |
  typeof NOT |
  typeof NUMBER |
  typeof POSITION |
  typeof ROUND |
  typeof STARTS_WITH |
  typeof STRING_LENGTH |
  typeof STRING |
  typeof SUBSTRING_AFTER |
  typeof SUBSTRING_BEFORE |
  typeof SUBSTRING |
  typeof SUM |
  typeof TRANSLATE |
  typeof TRUE;
