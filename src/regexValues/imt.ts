import { checkRegex, Rule } from '../warnings/common';
import { createTypeWarning } from '../warnings/TypeWarning';

export default checkRegex(/^((application|audio|example|image|message|model|multipart|text|video)(\/[-\w+.]+)(;\s*[-\w]+=[-\w]+)*;?)$/, createTypeWarning('Internet Media Type (IMT)')) as Rule;
