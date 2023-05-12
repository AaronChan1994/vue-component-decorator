require('./jsdom.init');
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { component, vmodel } from '../src';

@component()
class Component {
  /**
   * declare vmodel = prop + auto $emit on set
   * @link https://cn.vuejs.org/guide/components/v-model.html
   */
  @vmodel()
  public declare foo: string;

  public bar() {
    // will do: this.$emit('update:foo','bar');
    this.foo = 'bar';
  }
}

describe('vmodel.ts', () => {
  it('should $emit update:[key] on set', () => {
    const ClassComponent: any = Component;
    const vm = mount<any>(ClassComponent, { props: { foo: 'prop foo' } }).vm;
    expect(vm.foo).to.equal('prop foo');
    expect(vm.foo = 'foo').to.equal('foo');
    // TODO: expect $emit callback
  });

});
