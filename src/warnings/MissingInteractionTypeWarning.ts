import { Path, Warning } from './common';

export default class MissingInteractionTypeWarning extends Warning {
  constructor(data: any, path: Path) {
    super(data, path);
  }
}
