import { restrictToSchema, optional, required, Rule } from '../warnings/common';
import { stringValue, languageMap } from '../factory';

export default restrictToSchema({
  id: required(stringValue),
  description: optional(languageMap)
}) as Rule;
