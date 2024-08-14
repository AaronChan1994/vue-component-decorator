import { InjectOptions, propertyDecorator, Vue } from './index';
import { constructor } from './utils';

export interface RefOptions {
  from: string;
}

export function ref<T>(options: Partial<RefOptions> | T, property?: string) {
  return propertyDecorator<InjectOptions>(options, (options, target, property) => {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'refs')) {
      Component.refs = {};
    }
    Component.refs[property] = options;
  }, property);
}
