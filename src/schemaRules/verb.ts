import { restrictToSchema, required, optional, Rule } from '../warnings/common';
import { iri, languageMap } from '../factory';

export default restrictToSchema({
  id: required(iri),
  display: optional(languageMap)
}) as Rule;
