require('./jsdom.init');
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { component, watch } from '../src';

@component
class Component {
  public foo = 'foo';
  public oldFoo = '';
  public currFoo = '';

  @watch('foo')
  public onFooChange(val: string, old: string) {
    this.currFoo = val;
    this.oldFoo = old;
  }
}

@component
class WatchComponent {
  public foo = {
    bar: 'foo',
  };
  public oldFoo?: any;
  public currFoo?: any;

  /**
   * declare watch
   * @link https://cn.vuejs.org/api/options-state.html#watch
   */
  @watch('foo', { immediate: true, deep: true })
  public onFooChange(val: string, old: string) {
    this.currFoo = val;
    this.oldFoo = old;
  }
}

describe('watch.ts', () => {
  it('should trigger watch callback', () => {
    const ClassComponent: any = Component;
    const vm = mount<any>(ClassComponent).vm;
    expect(vm.foo).to.equal('foo');
    expect(vm.oldFoo).to.equal(vm.currFoo).to.equal('');
    expect(vm.foo = 'bar').to.equal('bar');
    // TODO: expect in nextTick
    // expect(vm.currFoo).to.equal('bar');
    // expect(vm.oldFoo).to.equal('foo');
    vm.$nextTick(() => {
      console.log(vm.currFoo, vm.oldFoo);
    });
  });

  it('should support watch options', () => {
    const ClassComponent: any = WatchComponent;
    const vm = mount<any>(ClassComponent).vm;
    expect(vm.currFoo).to.equal(vm.foo);
    expect(vm.oldFoo).to.equal(undefined);
    expect(vm.foo.bar = 'bar').to.equal('bar');
    // TODO: expect in nextTick
    // expect(vm.currFoo).to.equal(vm.foo);
    // expect(vm.oldFoo).to.equal(vm.foo);
    expect(vm.foo = 'bar').to.equal('bar');
    // expect(vm.currFoo).to.equal(vm.foo);
    // expect(vm.oldFoo).to.equal(vm.foo);
  });
});
