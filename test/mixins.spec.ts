require('./jsdom.init');
import {mount} from '@vue/test-utils';
import {expect} from 'chai';
import {component, mixins} from '../src';

class A {
    public a: string;

    public constructor(a: string) {
        this.a = a;
    }

    public aa() {
        return this.a;
    }
}

class B extends A {
    public b: string;

    public constructor() {
        super('a');
        this.b = 'b';
    }

    public bb() {
        return this.b;
    }
}

class C {
    public c = 'c';
}


@component
class Component extends mixins(B, C) {
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
