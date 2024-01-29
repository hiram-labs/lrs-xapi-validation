export type Path = string[];

export class Warning implements Error {
  public readonly name: string;
  public readonly message: string;
  public stack?: string; // tslint:disable-line:readonly-keyword

  constructor(
    public data: any,
    public path: Path
  ) {
    this.message = 'Validation Error';
    this.name = this.constructor.name;
    this.stack = new Error(this.message).stack;
  }
}

export class TypeWarning extends Warning {
  constructor(
    data: any,
    path: Path,
    public type: () => unknown
  ) {
    super(data, path);
  }
}

export class RequiredWarning extends Warning {
  constructor(data: any, path: Path) {
    super(data, path);
  }
}

export class RestrictedKeysWarning extends Warning {
  constructor(
    data: any,
    path: Path,
    public keys: string[]
  ) {
    super(data, path);
  }
}

export type Rule = (data: any, path: Path) => Warning[];

export const createWarning = (data: any, path: Path): Warning => new Warning(data, path);

export const createTypeWarning = (data: any, path: Path, type: () => any): Warning => new TypeWarning(data, path, type);

export const createRequiredWarning = (data: any, path: Path): Warning => new RequiredWarning(data, path);

export const createRestrictedKeysWarning = (data: any, path: Path, keys: string[]): Warning =>
  new RestrictedKeysWarning(data, path, keys);

export const composeRules =
  (rules: Rule[]): Rule =>
  (data, path) =>
    rules.reduce((warnings: Warning[], rule: Rule) => [...warnings, ...rule(data, path)], []);

export const first =
  (preReq: Rule, postReq: Rule): Rule =>
  (data, path) => {
    const preReqWarnings = preReq(data, path);
    if (preReqWarnings.length > 0) {
      return preReqWarnings;
    }
    return postReq(data, path);
  };

export const checkType =
  (type: any): Rule =>
  (data, path) =>
    data === undefined || data === null || data.constructor !== type ? [createTypeWarning(data, path, type)] : [];

export const checkRegex = (regex: RegExp, regexWarning = createWarning) =>
  first(checkType(String), (data, path) => (regex.test(data) ? [] : [regexWarning(data, path)]));

export const optional =
  (rule: Rule): Rule =>
  (data, path) =>
    data === undefined ? [] : rule(data, path);

export const required =
  (rule: Rule): Rule =>
  (data, path) =>
    data === undefined ? [createRequiredWarning(data, path)] : rule(data, path);

// (String[] -> (String -> PathWarning), (Data -> PathWarning)) -> Rule
export const restrictToKeys = (keys: string[]): Rule =>
  first(checkType(Object), (data, path) => {
    const invalidKeys = Object.keys(data).filter((key: string) => keys.indexOf(key) === -1);
    return invalidKeys.length === 0 ? [] : [createRestrictedKeysWarning(data, path, invalidKeys)];
  });

export interface Schema {
  readonly [key: string]: Rule;
}

export const hasSchema = (schema: Schema): Rule =>
  first(checkType(Object), (data, path) =>
    Object.keys(schema).reduce(
      (warnings: Warning[], key: string) => [...warnings, ...schema[key](data[key], [...path, key])],
      []
    )
  );

export const restrictToSchema = (schema: Schema): Rule =>
  first(checkType(Object), composeRules([hasSchema(schema), restrictToKeys(Object.keys(schema))]));

export const restrictToCollection = (rule: (index: number) => Rule) =>
  first(checkType(Array), (data, path) =>
    data.reduce(
      (warnings: Warning[], elem: any, index: number) => [
        ...warnings,
        ...rule(index)(elem, [...path, index.toString()])
      ],
      []
    )
  );
