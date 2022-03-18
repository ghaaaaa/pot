export interface IDataStructure {
  [K: string]: number | IConstant<IDataStructure>;
}

export interface IConstant<T extends IDataStructure> {
  // new (data: T): void;
  get(key: keyof T): T[keyof T];
  valueOf(): T;
}

export class Constant<T extends IDataStructure> implements IConstant<IDataStructure> {
  constructor(private readonly data: T) {
    return this;
  }

  get(key: keyof T) {
    return this.data[key];
  }

  valueOf() {
    return this.data;
  }
}

new Constant({
  user: 1,
  guest: 2,
  admin: 3,
  role: new Constant({
    master: 4,
    doctor: 5,
  }),
}).get('role');
