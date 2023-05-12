import { PropOptions, Vue } from './index';
import { constructor, PropertyDecorator } from './utils';

export interface VModelOptions extends PropOptions {

}

export function vmodel(options: Partial<VModelOptions> = {}): PropertyDecorator<any> {
  return function(target, property) {
    const Component = constructor<typeof Vue>(target);
    if (!Object.hasOwn(Component, 'vmodels')) {
      Component.vmodels = {};
    }
    Component.vmodels[property] = options;
  };
}
