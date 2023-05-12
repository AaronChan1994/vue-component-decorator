import { Vue } from './index';
import { constructor, PropertyDecorator } from './utils';

export interface RefOptions {
  from: string;
}

export function ref(options: Partial<RefOptions> = {}): PropertyDecorator<any> {
  return function(target, property) {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'refs')) {
      Component.refs = {};
    }
    Component.refs[property] = options;
  };
}
