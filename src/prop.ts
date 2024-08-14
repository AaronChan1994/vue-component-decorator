import { PropType } from 'vue';
import { propertyDecorator, Vue } from './index';
import { constructor } from './utils';

export interface PropOptions<T = any> {
  default: T | (() => T);
  required: boolean;
  type: PropType<T>;
  validator?: (value: T) => boolean;
}

export function prop<T>(options: Partial<PropOptions<T>> | T, property?: string) {
  return propertyDecorator<PropOptions<T>, T>(options , (options, target, property) => {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'props')) {
      Component.props = {};
    }
    Component.props[property] = options;
  }, property);
}
