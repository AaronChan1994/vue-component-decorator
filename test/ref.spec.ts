require('./jsdom.init');
import { component, ref } from '../src';


@component()
class Component {
  /**
   * declare foo = this.$refs.foo
   * @link https://cn.vuejs.org/api/built-in-special-attributes.html#ref
   */
  @ref()
  public declare foo: string;
}

@component()
class RefComponent {
  /**
   * declare foo = this.$refs.fooRef
   * @link https://cn.vuejs.org/api/built-in-special-attributes.html#ref
   */
  @ref({ from: 'fooRef' })
  public declare foo: string;
}

describe('ref.ts', () => {

});
