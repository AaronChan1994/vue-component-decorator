import { PropType } from 'vue';
import { Vue } from './index';
import { constructor, PropertyDecorator } from './utils';

export interface PropOptions<T = any> {
  default: T | (() => T);
  required: boolean;
  type: PropType<T>;
  validator?: (value: T) => boolean;
}

export function prop<T>(options: Partial<PropOptions<T>> = {}): PropertyDecorator<any> {
  return function(target, property) {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'props')) {
      Component.props = {};
    }
    Component.props[property] = options;
  };
}
