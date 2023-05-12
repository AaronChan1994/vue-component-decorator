import 'vue-router';
import { ComponentCustomProperties, ComponentPublicInstance } from 'vue';
import { InjectOptions } from './inject';
import { PropOptions } from './prop';
import { ProvideOptions } from './provide';
import { RefOptions } from './ref';
import { VModelOptions } from './vmodel';
import { WatchOptions } from './watch';

export * from './prop';
export * from './component';
export * from './watch';
export * from './provide';
export * from './inject';
export * from './vmodel';
export * from './ref';

export class Vue {
  public static __vccOpts?: any;
  public static refs: Record<string, Partial<RefOptions>>;
  public static vmodels: Record<string, Partial<VModelOptions>>;
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
