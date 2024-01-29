import { checkRegex, Rule } from '../warnings/common';
import { createTypeWarning } from '../warnings/TypeWarning';

export default checkRegex(/^\b[0-9a-f]{5,40}$/i, createTypeWarning('Sha1')) as Rule;
