require('./jsdom.init');
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { component, provide } from '../src';


@component
class Component {
  /**
   * declare provide
   * @link https://cn.vuejs.org/guide/components/provide-inject.html#provide
   */
  @provide('foo')
  public declare foo: string;
}

@component
class ProvideComponent {
  /**
   * declare provide with options
   * @link https://cn.vuejs.org/guide/components/provide-inject.html#provide
   */
  @provide('foo', 'provideFoo')
  public declare foo: string;
}

describe('provide.ts', () => {
  it('should provide value and get value by self', () => {
    const ClassComponent: any = Component;
    expect(ClassComponent.__vccOpts.provide.foo).to.equal('foo');
    const vm = mount<any>(ClassComponent).vm;
    expect(vm.foo).to.equal('foo');
  });

  it('should declare provide with other name', () => {
    const ClassComponent: any = ProvideComponent;
    expect(ClassComponent.__vccOpts.provide.provideFoo).to.equal('foo');
    const vm = mount<any>(ClassComponent).vm;
    expect(vm.foo).to.equal('foo');
  });
});
