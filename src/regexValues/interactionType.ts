import { checkRegex, Rule } from '../warnings/common';
import { createTypeWarning } from '../warnings/TypeWarning';

export default checkRegex(/^((choice)|(sequencing)|(likert)|(matching)|(performance)|(true-false)|(fill-in)|(long-fill-in)|(numeric)|(other))$/, createTypeWarning('Interaction Type')) as Rule;
