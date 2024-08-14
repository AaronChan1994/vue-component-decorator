import { propertyDecorator, Vue } from './index';
import { constructor } from './utils';

export interface InjectOptions {
  from: string;
  default: any;
}

export function inject<T>(options: Partial<InjectOptions> | T, property?: string) {
  return propertyDecorator<InjectOptions>(options, (options, target, property) => {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'inject')) {
      Component.inject = {};
    }
    Component.inject[property] = options;
  }, property);
}
