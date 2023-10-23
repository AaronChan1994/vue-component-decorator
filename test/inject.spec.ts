require('./jsdom.init');
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { component, inject } from '../src';

@component
class Component {
  /**
   * declare inject
   * @link https://cn.vuejs.org/guide/components/provide-inject.html#inject
   */
  @inject()
  public declare foo: string;
}

@component
class InjectComponent {
  /**
   * declare inject with options
   * @link https://cn.vuejs.org/guide/components/provide-inject.html#inject
   */
  @inject({ from: 'provideFoo' })
  public declare foo: string;

  @inject({ default: 'bar' })
  public declare bar: string;
}

describe('inject.ts', () => {
  it('should inject value by key', () => {
    const ClassComponent: any = Component;
    expect(typeof ClassComponent.__vccOpts.inject.foo).to.equal('object');
    const vm = mount<any>(ClassComponent, { global: { provide: { foo: 'foo' } } }).vm;
    expect(vm.foo).to.equal('foo');
  });

  it('should support inject options', () => {
    const ClassComponent: any = InjectComponent;
    expect(typeof ClassComponent.__vccOpts.inject.foo).to.equal('object');
    const vm = mount<any>(ClassComponent, { global: { provide: { provideFoo: 'foo' } } }).vm;
    expect(vm.foo).to.equal('foo');
    expect(vm.bar).to.equal('bar');
  });
});
