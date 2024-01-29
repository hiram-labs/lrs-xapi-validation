import { checkRegex, Rule } from '../warnings/common';
import { createTypeWarning } from '../warnings/TypeWarning';

const regex = /^\w+:/i;
const warningConstructor = createTypeWarning('Internationalized Resource Identifier (IRI)');

export default checkRegex(regex, warningConstructor) as Rule;
