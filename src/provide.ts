import { Vue } from './index';
import { constructor, PropertyDecorator } from './utils';

export interface ProvideOptions {
  key: string;
  value: any;
}

export function provide(value: any, key?: string): PropertyDecorator<any> {
  return function(target, property) {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'provide')) {
      Component.provide = {};
    }
    Component.provide[property] = { key, value } as ProvideOptions;
  };
}
