import { assert } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import Label from './index';

describe('form/label', () => {
  it('should create a formLabel', () => {
    const wrapper = render(<Label>Hello world</Label>);

    assert.isOk(wrapper.children().length, 'formLabel not created');
    assert.strictEqual(wrapper.text(), 'Hello world',
      'child contents not found');
  });
});
