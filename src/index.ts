import { ComponentCustomProperties, ComponentPublicInstance } from 'vue';
import 'vue-router';
import { InjectOptions } from './inject';
import { ModelOptions } from './model';
import { PropOptions } from './prop';
import { ProvideOptions } from './provide';
import { RefOptions } from './ref';
import { Class } from './utils';
import { WatchOptions } from './watch';

export * from './prop';
export * from './component';
export * from './watch';
export * from './provide';
export * from './inject';
export * from './model';
export * from './ref';
export * from './utils';

export class Vue {
  public static with<Methods extends Record<string, Function>>(methods: Methods) {
    const C = class {
    };
    for (const [key, value] of Object.entries(methods)) {
      (C.prototype as any)[key] = value;
    }
    return C as Class<Methods>;
  }

  public static __vccOpts?: any;
  public static refs: Record<string, Partial<RefOptions>>;
  public static models: Record<string, Partial<ModelOptions>>;
  public static props: Record<string, Partial<PropOptions>>;
  public static watch: Record<string, Partial<WatchOptions>>;
  public static provide: Record<string, Partial<ProvideOptions>>;
  public static inject: Record<string, Partial<InjectOptions>>;
  public declare $route: ComponentCustomProperties['$route'];
  public declare $router: ComponentCustomProperties['$router'];
  public declare $: ComponentPublicInstance['$'];
  public declare $data: ComponentPublicInstance['$data'];
  public declare $props: ComponentPublicInstance['$props'] & Record<string, any>;
  public declare $attrs: ComponentPublicInstance['$attrs'];
  public declare $refs: ComponentPublicInstance['$refs'];
  public declare $slots: ComponentPublicInstance['$slots'];
  public declare $root: ComponentPublicInstance['$root'];
  public declare $parent: ComponentPublicInstance['$parent'];
  public declare $emit: ComponentPublicInstance['$emit'];
  public declare $el: ComponentPublicInstance['$el'];
  public declare $options: ComponentPublicInstance['$options'];
  public declare $forceUpdate: ComponentPublicInstance['$forceUpdate'];
  public declare $nextTick: ComponentPublicInstance['$nextTick'];
  public declare $watch: ComponentPublicInstance['$watch'];

  public beforeCreate?(): void;

  public created?(): void;

  public beforeMount?(): void;

  public mounted?(): void;

  public beforeUpdate?(): void;

  public updated?(): void;

  public activated?(): void;

  public deactivated?(): void;

  public beforeUnmount?(): void;

  public unmounted?(): void;
}
