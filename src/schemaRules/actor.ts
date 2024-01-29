import { Rule } from '../warnings/common';
import objectTypeFactory from '../helpers/objectTypeFactory';
import { agent, group } from '../factory';

export default objectTypeFactory(
  () => ({
    Agent: agent,
    Group: group
  }),
  'Agent'
) as Rule;
