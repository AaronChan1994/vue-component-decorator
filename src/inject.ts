import { Vue } from './index';
import { constructor, PropertyDecorator } from './utils';

export interface InjectOptions {
  from: string;
  default: any;
}

export function inject(options: Partial<InjectOptions> = {}): PropertyDecorator<any> {
  return function(target, property) {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'inject')) {
      Component.inject = {};
    }
    Component.inject[property] = options;
  };
}
