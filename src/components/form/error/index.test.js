import { assert } from 'chai';
import React from 'react';
import { render, shallow } from 'enzyme';
import Error from './index';

describe('Error', () => {
  it('should create a error', () => {
    const wrapper = render(
      <Error isVisible>Hello world</Error>
    );

    assert.isOk(wrapper.children().length, 'error not created');
    assert.strictEqual(wrapper.text(), 'Hello world',
      'child contents not found');
    assert.isNotOk(wrapper.find('.hide').length, 'error is hidden');
  });

  it('should allow for custom attributes', () => {
    const wrapper = shallow(
      <Error data-foo="bar" />
    );
    assert.isOk(wrapper.find('[data-foo="bar"]').length, 'custom property not found');
  });

  it('should be hidden by default', () => {
    const wrapper = shallow(
      <Error />
    );
    assert.isOk(wrapper.find('.hide').length, 'is not hidden');
  });

  it('should be hidden if isVisible is false', () => {
    const wrapper = shallow(
      <Error isVisible={false} />
    );
    assert.isOk(wrapper.find('.hide').length, 'is not hidden');
  });
});
