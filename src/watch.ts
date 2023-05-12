import { constructor, MethodDecorator } from './utils';
import { Vue } from './index';

export interface WatchOptions {
  immediate: boolean;
  deep: boolean;
}

export function watch(key: string, options: Partial<WatchOptions> = {}): MethodDecorator<any> {
  return function(target, property, descriptor) {
    const Component = constructor<typeof Vue>(target);
    Object.defineProperty(options, 'handler', descriptor);
    if (!Object.hasOwn(Component, 'watch')) {
      Component.watch = {};
    }
    Component.watch[key] = options;
  };
}
