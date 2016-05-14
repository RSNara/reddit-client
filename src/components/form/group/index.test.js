import { assert } from 'chai';
import React from 'react';
import { render, shallow } from 'enzyme';
import Group from './index';

describe('Group', () => {
  it('should create a group', () => {
    const wrapper = render(
      <Group>Hello world</Group>
    );

    assert.isOk(wrapper.children().length, 'group not created');
    assert.strictEqual(wrapper.text(), 'Hello world',
      'child contents not found');
  });

  it('should allow for custom attributes', () => {
    const wrapper = shallow(
      <Group data-foo="bar" />
    );
    assert.isOk(wrapper.find('[data-foo="bar"]').length, 'custom property not found');
  });
});
