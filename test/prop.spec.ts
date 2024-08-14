require('./jsdom.init');
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { component, prop } from '../src';

@component
class Component {
  public get computedFoo() {
    return this.foo;
  }

  public set computedFoo(val) {
    this.foo = val;
  }

  @prop
  public declare foo: string;

  public bar() {
    return this.foo + 'bar';
  }
}

@component
class PropComponent {
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
  public declare foo: number;

  public bar() {
    return this.foo >= 0;
  }
}
describe('prop.ts', () => {
  it('should be received props on mount', () => {
    const ClassComponent: any = Component;
    const vm = mount<any>(ClassComponent, { props: { foo: 'prop foo' } }).vm;
    expect(vm.foo).to.equal('prop foo');
    expect(vm.bar()).to.equal(vm.foo + 'bar').to.equal('prop foobar');
    expect(vm.computedFoo).to.equal(vm.foo).to.equal('prop foo');
  });
  it('should support PropOptions in vue', () => {
    const ClassComponent: any = PropComponent;
    let vm = mount<any>(ClassComponent, { props: {} }).vm;
    expect(vm.foo).to.equal(0);
    expect(vm.bar()).to.equal(true);

    vm = mount<any>(ClassComponent, { props: { foo: -1 } }).vm;
    expect(vm.foo).to.equal(-1);
    expect(vm.bar()).to.equal(false);

    vm = mount<any>(ClassComponent, { props: { foo: 1 } }).vm;
    expect(vm.foo).to.equal(1);
    expect(vm.bar()).to.equal(true);
  });
});
