require('./jsdom.init');
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import { component, Vue } from '../src';
import { mixins } from '../src/utils';

class A {
  public a = 'a';
  public c = 'a';

  public aa() {
    return this.a;
  }
}

class B {
  public b = 'b';
  public c = 'b';

  public bb() {
    return this.b;
  }
}

class C extends mixins(Vue, A, B) {
  public c = 'c';
}

@component()
class Component extends C {
  public get foo() {
    return this.c;
  }
}

describe('mixins.ts', () => {
  it('should mixins all members', () => {
    const ClassComponent: any = Component;
    const vm = mount<any>(ClassComponent).vm;
    expect(vm.a).to.equal(vm.aa()).to.equal('a');
    expect(vm.b).to.equal(vm.bb()).to.equal('b');
    expect(vm.c).to.equal(vm.foo).to.equal('c');
  });
});
