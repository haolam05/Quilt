
import * as assert from 'assert';
import * as React from 'react';
import { jnil, jcons, jcompact, jexplode } from './jsx_list';


describe('jsx_list', function() {

  const elem1: JSX.Element = React.createElement("P", {}, "hi");
  const elem2: JSX.Element = React.createElement("SPAN", {}, "there");

  it('jcompact', function() {
    assert.deepEqual(jcompact(jnil), []);
    assert.deepEqual(jcompact(jcons(elem1, jnil)), [elem1]);
    assert.deepEqual(jcompact(jcons(elem1, jcons(elem2, jnil))), [elem1, elem2]);
  });

  it('jexplode', function() {
    assert.deepEqual(jexplode([]), jnil);
    assert.deepEqual(jexplode([elem1]), jcons(elem1, jnil));
    assert.deepEqual(jexplode([elem1, elem2]), jcons(elem1, jcons(elem2, jnil)));
  });

});