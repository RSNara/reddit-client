import { assert } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import Navigator from './index';

describe('Navigator', () => {
  it('should render a <nav> and its children', () => {
    const wrapper = render(<Navigator>Hello world</Navigator>);
    const navElement = wrapper.find('nav');

    assert.isOk(navElement.length, 'nav element not found');
    assert.strictEqual(navElement.text(), 'Hello world',
      'child contents not found');
  });
});
