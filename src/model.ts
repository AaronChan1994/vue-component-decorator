import { PropOptions, Vue } from './index';
import { constructor, PropertyDecorator } from './utils';

export interface ModelOptions extends PropOptions {

}

export function model(options: Partial<ModelOptions> = {}): PropertyDecorator<any> {
  return function(target, property) {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'models')) {
      Component.models = {};
    }
    Component.models[property] = options;
  };
}
