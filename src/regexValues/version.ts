import { checkRegex, Rule } from '../warnings/common';
import { createTypeWarning } from '../warnings/TypeWarning';

export default checkRegex(/^1\.0(\.[0-9]+)?$/, createTypeWarning('Version')) as Rule;
