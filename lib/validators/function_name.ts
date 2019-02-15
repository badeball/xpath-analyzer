import { NUMBER } from "../expr_type";

import {
  FunctionName,
  BOOLEAN,
  CEILING,
  CONCAT,
  CONTAINS,
  COUNT,
  FALSE,
  FLOOR,
  ID,
  LAST,
  LOCAL_NAME,
  NAME,
  NORMALIZE_SPACE,
  NOT,
  POSITION,
  ROUND,
  STARTS_WITH,
  STRING_LENGTH,
  STRING,
  SUBSTRING_AFTER,
  SUBSTRING_BEFORE,
  SUBSTRING,
  SUM,
  TRANSLATE,
  TRUE
} from "../function_name";

export function isValid (name: string): name is FunctionName {
  return name == BOOLEAN ||
    name == CEILING ||
    name == CONCAT ||
    name == CONTAINS ||
    name == COUNT ||
    name == FALSE ||
    name == FLOOR ||
    name == ID ||
    name == LAST ||
    name == LOCAL_NAME ||
    name == NAME ||
    name == NORMALIZE_SPACE ||
    name == NOT ||
    name == NUMBER ||
    name == POSITION ||
    name == ROUND ||
    name == STARTS_WITH ||
    name == STRING_LENGTH ||
    name == STRING ||
    name == SUBSTRING_AFTER ||
    name == SUBSTRING_BEFORE ||
    name == SUBSTRING ||
    name == SUM ||
    name == TRANSLATE ||
    name == TRUE;
}
