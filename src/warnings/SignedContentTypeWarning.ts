import { Path, Warning } from './common';

export default class SignedContentTypeWarning extends Warning {
  constructor(
    data: any,
    path: Path,
    public contentType: string
  ) {
    super(data, path);
  }
}
