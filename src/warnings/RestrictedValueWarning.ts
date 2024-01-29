import { Path, Warning } from './common';

export default class RestrictedValueWarning extends Warning {
  constructor(
    data: any,
    path: Path,
    public requiredValue: any
  ) {
    super(data, path);
  }
}
