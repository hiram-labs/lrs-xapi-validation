import { checkRegex, Rule } from '../warnings/common';
import { createTypeWarning } from '../warnings/TypeWarning';

export default checkRegex(/^mailto:[A-Z0-9.`'_%+-]+@[A-Z0-9.-]+.[A-Z]{1,63}$/i, createTypeWarning('Mailto')) as Rule;
