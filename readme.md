# vue-component-decorator

Do the same work
like [vue-class-component](https://github.com/vuejs/vue-class-component),  [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator), [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator).

* Class style component decorator for vue 3.
* Snakecase naming style.
* Support @watch like [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator).
* Support @model like [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator).
* Support `mixins` any ES class.

This readme refers to [vue-facing-decorator](https://github.com/facing-dev/vue-facing-decorator)
and [vue-class-component](https://github.com/vuejs/vue-class-component), thank you.

-----------------

# Installation

``
npm i @aaron1994/vue-component-decorator
``

# Usage

``` typescript
@component()
class Component {

  /**
   * member of data
   * @link https://cn.vuejs.org/api/options-state.html#data
   */
  public foo = 'foo';

  /**
   * member of methods
   * @link https://cn.vuejs.org/api/options-state.html#methods
   */
  public bar() {
    return this.foo + 'bar';
  }

  /**
   * declare props
   * @link https://cn.vuejs.org/api/options-state.html#props
   */
  @prop({
    type: Number, default: 0, required: true,
    validator: (value) => {
      return value >= 0;
    },
  })
  public declare prop: number;

  /**
   * declare watch
   * @link https://cn.vuejs.org/api/options-state.html#watch
   */
  @watch('foo', { immediate: true, deep: true })
  public onFooChange(val: string, old: string) {

  }

  /**
   * computed getter
   * @link https://cn.vuejs.org/api/options-state.html#computed
   */
  public get computedFoo() {
    return this.foo;
  }

  /**
   * computed setter
   * @link https://cn.vuejs.org/api/options-state.html#computed
   */
  public set computedFoo(val) {
    this.foo = val;
  }

   /**
   * declare provide with options
   * @link https://cn.vuejs.org/guide/components/provide-inject.html#provide
   */
  @provide('foo', 'provideFoo')
  public declare provided: string;

   /**
   * declare inject
   * @link https://cn.vuejs.org/guide/components/provide-inject.html#inject
   */
  @inject()
  public declare injected: string;

  /**
   * declare vmodel = prop + auto $emit on set
   * @link https://cn.vuejs.org/guide/components/v-model.html
   */
  @model()
  public declare vmodel: string;

  /**
   * declare foo = this.$refs.fooRef
   * @link https://cn.vuejs.org/api/built-in-special-attributes.html#ref
   */
  @ref({ from: 'fooRef' })
  public declare refEl: HTMLElement;

}
```

# Documentation

The documentation is not ready yet. But you can see `test` file.
