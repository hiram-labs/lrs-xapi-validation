import { Path, Warning } from './common';

export default class IfiCountWarning extends Warning {
  constructor(
    data: any,
    path: Path,
    public usedIfis: string[]
  ) {
    super(data, path);
  }
}
