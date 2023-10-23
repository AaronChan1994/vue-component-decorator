require('./jsdom.init');
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { component } from '../src';

@component
class Component {
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
   * member of data
   * @link https://cn.vuejs.org/api/options-state.html#data
   */
  public foo = 'foo';

  /**
   * member of data
   * @link https://cn.vuejs.org/api/options-state.html#methods
   */
  public bar() {
    return this.foo + 'bar';
  }
}

@component({ emits: ['foo', 'bar'] })
class EmitsComponent {
}

@component({ name: 'custom-component' })
class NamedComponent {
}

/**
 * implements a ClassComponent
 * @see {ClassComponent} in @vue/runtime-core/dist/runtime-core.d.ts
 */
describe('component.ts', () => {
  it('should implements ClassComponent', () => {
    const ClassComponent: any = Component;
    expect(typeof ClassComponent.__vccOpts).to.equal('object');
    expect(Object.keys(ClassComponent.__vccOpts)).to.deep.equal(['name', 'emits', 'provide', 'inject', 'components', 'data', 'computed', 'methods', 'props', 'watch']);
  });

  it('should set name and ClassComponent.name by default', () => {
    let ClassComponent: any = Component;
    expect(ClassComponent.__vccOpts.name).to.equal(Component.name);
    ClassComponent = NamedComponent;
    expect(ClassComponent.__vccOpts.name).to.equal('custom-component');
  });

  it('should set data that was a function return a obj with props of ClassComponent', () => {
    const ClassComponent: any = Component;
    expect(typeof ClassComponent.__vccOpts.data).to.equal('function');
    expect(ClassComponent.__vccOpts.data().foo).to.equal('foo');
  });

  it('should set methods of ClassComponent', () => {
    const ClassComponent: any = Component;
    expect(typeof ClassComponent.__vccOpts.methods.bar).to.equal('function');
  });

  it('should set getters/setters of ClassComponent', () => {
    const ClassComponent: any = Component;
    expect(typeof ClassComponent.__vccOpts.computed.computedFoo.get).to.equal('function');
    expect(typeof ClassComponent.__vccOpts.computed.computedFoo.set).to.equal('function');
  });

  it('should set emits of ClassComponent', () => {
    const ClassComponent: any = EmitsComponent;
    expect(ClassComponent.__vccOpts.emits).to.deep.equal(['foo', 'bar']);
  });

  it('should be mounted as vue component', () => {
    const ClassComponent: any = Component;
    const vm = mount<any>(ClassComponent).vm;
    expect(vm.foo).to.equal('foo');
    expect(vm.bar()).to.equal(vm.foo + 'bar').to.equal('foobar');
    expect(vm.computedFoo).to.equal(vm.foo).to.equal('foo');
    expect(vm.computedFoo = 'bar').to.equal(vm.foo).to.equal('bar');
    expect(vm.bar()).to.equal(vm.foo + 'bar').to.equal('barbar');
  });
});
