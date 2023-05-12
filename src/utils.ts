export type IteratorProcessAble<T> = Iterable<T> | Record<string, T>;
export type IterCallback<V, C, T extends IteratorProcessAble<V>, K = T extends Iterable<V> ? number : keyof T & string> = (value: V, key: K, items: T) => C;

export type ForEachCallback<V, T extends IteratorProcessAble<V>> = IterCallback<V, void, T>;

export type Optional<T> = Partial<T>;

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type ExcludeField<Type, FieldExcluded> = {
  [Property in keyof Type as Exclude<Property, FieldExcluded>]: Type[Property]
};
export type RecordTree<T> = Record<string, T | Record<string, T>>;

export type Creator<T> = () => T;

export type Class<T = any, P extends any[] = any[]> = { new(...args: P): T; };
export type ParameterDecorator<T> = (target: T, property: string | symbol, index: number) => void;
export type PropertyDecorator<T, P = any> = (target: T, property: P) => void;
export type MethodDecorator<T, P = any> = (target: T, property: P, descriptor: PropertyDescriptor) => void;
export type ClassDecorator<T> = (constructor: T) => void;
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
export type ExtractInstance<T> = T extends Class<infer V> ? V : never
export type Mixed<Mixins extends Class[]> = Mixins extends (infer T)[] ? Class<UnionToIntersection<ExtractInstance<T>>> : never

export function constructor<T extends Class>(target: any): T {
  return target.constructor as any;
}

export function mixins<T extends Class[]>(...classes: T): Mixed<T> {
  const C = class {
    constructor() {
      for (const C of classes) {
        const c = new C();
        const descriptors = Object.getOwnPropertyDescriptors(c);
        foreach(descriptors, ['constructor'], (descriptor, key) => {
          Object.defineProperty(this, key, descriptor);
        });
      }
    }
  };
  for (const c of classes) {
    let descriptors = Object.getOwnPropertyDescriptors(c);
    foreach(descriptors, ['name', 'length', 'prototype'], (descriptor, key) => {
      Object.defineProperty(C, key, descriptor);
    });
    descriptors = Object.getOwnPropertyDescriptors(c.prototype);
    foreach(descriptors, ['constructor'], (descriptor, key) => {
      Object.defineProperty(C.prototype, key, descriptor);
    });
  }
  return C as Mixed<T>;
}

export function isset(value: unknown): value is any {
  return value != null;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isArray<V = any>(value: unknown): value is Array<V> {
  return Array.isArray(value);
}

export function isIterable<V = any>(value: unknown): value is Iterable<V> {
  return Symbol.iterator in Object(value);
}

export function isType(value: unknown, type: string) {
  return {}.toString.call(value) == '[object ' + type + ']';
}

export function isObject(value: unknown): value is Record<string, any> {
  return isType(value, 'Object');
}

export function isFunction(value: unknown): value is Function {
  return isType(value, 'Function');
}

export function foreach<V, T extends IteratorProcessAble<V>, K = T extends Iterable<V> ? number : keyof T & string>(data: IteratorProcessAble<V> & T | undefined, callback: ForEachCallback<V, T>): void;
export function foreach<V, T extends IteratorProcessAble<V>, K = T extends Iterable<V> ? number : keyof T & string>(data: IteratorProcessAble<V> & T | undefined, excludes: K[], callback: ForEachCallback<V, T>): void;
export function foreach<V, T extends IteratorProcessAble<V>, K = T extends Iterable<V> ? number : keyof T & string>(data: IteratorProcessAble<V> & T | undefined, ...args: any[]): void {
  if (typeof data === 'undefined') {
    return;
  }
  let callback: ForEachCallback<V, T>;
  let excludes: K[];
  if (args.length === 1) {
    excludes = [];
    callback = args[0];
  } else {
    excludes = args[0];
    callback = args[1];
  }
  if (isIterable<V>(data)) {
    return Array.from(data).forEach((value, index, array) => {
      const key: any = index;
      if (!excludes.includes(key)) {
        callback(value, key, array as any);
      }
    });
  }
  return Object.keys(data).forEach((index) => {
    const key: any = index;
    if (!excludes.includes(key)) {
      callback(data[key], key, data);
    }
  });
}
