import {Class, Vue} from './index';
import {foreach, isFunction} from './utils';
import kebabCase from 'lodash.kebabcase';

export interface ComponentOptions {
    name: string;
    components: Record<string, any>;
    emits: string[];
}

function _component(arg: Partial<ComponentOptions> | typeof Vue, cb: (constructor: typeof Vue, options: Partial<ComponentOptions>) => any) {
    if (typeof arg === 'function') {
        return cb(arg, {});
    }
    return function (constructor: typeof Vue) {
        return cb(constructor, arg);
    };
}

export function component(arg: Partial<ComponentOptions> | Class) {
    return _component(arg as any, function (constructor: typeof Vue, options) {
        if (!constructor.__vccOpts) {
            const name = options.name ?? constructor.name;
            const components = options.components;
            const emits = options.emits;
            const methods = {};
            const computed: Record<string, any> = {};
            const props = constructor.props;
            const watch = constructor.watch;
            const inject = constructor.inject;
            const provide: Record<string, any> = {};
            foreach(constructor.provide, (options, key) => provide[options.key ?? key] = options.value);
            const hooks = {};
            const hookKeys = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'beforeUnmount', 'unmounted'];
            let prototype = constructor.prototype;
            while (prototype && prototype !== Object.prototype) {
                const descriptors = Object.getOwnPropertyDescriptors(prototype);
                foreach(descriptors, ['constructor'], (descriptor, key) => {
                    descriptor.enumerable = true;
                    if (hookKeys.includes(key)) {
                        Object.defineProperty(hooks, key, descriptor);
                    } else if (descriptor.get || descriptor.get) {
                        const {get, set} = descriptor;
                        computed[key] = {get, set};
                    } else {
                        Object.defineProperty(methods, key, descriptor);
                    }
                });
                prototype = Object.getPrototypeOf(prototype);
            }
            const data = function (this: Vue) {
                const component = new constructor();
                foreach(constructor.models, (options, key) => {
                    Object.defineProperty(this, key, {
                        get: () => {
                            return this.$attrs[key] ?? this.$attrs[kebabCase(key)] ?? (isFunction(options.default) ? options.default() : options.default);
                        },
                        set: (val: any) => {
                            this.$emit(`update:${key}`, val);
                        },
                    });
                });
                foreach(constructor.refs, (options, key) => {
                    Object.defineProperty(this, key, {
                        get: () => {
                            return this.$refs[options.from ?? key];
                        },
                    });
                });
                foreach(constructor.provide, (options, key) => {
                    Object.defineProperty(component, key, {value: options.value});
                });
                return component;
            };
            constructor.__vccOpts = {
                name,
                emits,
                provide,
                inject,
                components,
                data,
                computed,
                methods,
                props,
                watch,
                ...hooks,
            };
        }
        return constructor;
    });
}
