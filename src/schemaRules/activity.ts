import { restrictToSchema, optional, required, Rule } from '../warnings/common';
import { iri, definition } from '../factory';
import restrictToValue from '../helpers/restrictToValue';

export default restrictToSchema({
  objectType: optional(restrictToValue('Activity')),
  id: required(iri),
  definition: optional(definition)
}) as Rule;
