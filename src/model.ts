import { InjectOptions, propertyDecorator, PropOptions, Vue } from './index';
import { constructor } from './utils';

export interface ModelOptions extends PropOptions {

}

export function model<T>(options: Partial<ModelOptions> | T, property?: string) {
  return propertyDecorator<InjectOptions>(options, (options, target, property) => {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'models')) {
      Component.models = {};
    }
    Component.models[property] = options;
  }, property);
}
