import { Rule } from '../warnings/common';
import RestrictedValueWarning from '../warnings/RestrictedValueWarning';

export default (value: any): Rule => {
  return (data, path) => {
    if (data !== value) {
      return [new RestrictedValueWarning(data, path, value)];
    }
    return [];
  };
};
