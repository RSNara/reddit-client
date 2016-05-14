import { assert } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import Input from './index';

describe('Input', () => {
  it('should create an input', () => {
    // Render the Input component
    const props = {
      placeholder: 'sample placeholder',
    };
    const wrapper = render(
      <div id="root">
        <Input { ...props } />
      </div>
    );
    assert.isOk(wrapper.children().length, 'Unable to render component');

    // Find the input
    const inputElement = wrapper.find('input');
    assert.isOk(inputElement.length, 'Unable to render input');

    // Validate the props were set
    assert.isNotNull(
      inputElement.attr('type'),
      'type-attribute not found'
    );
    assert.strictEqual(
      inputElement.attr('type'), 'text',
      'type-attribute is not text by default'
    );
    assert.isNotNull(
      inputElement.attr('placeholder'),
      'placeholder-attribute not found'
    );
    assert.strictEqual(
      inputElement.attr('placeholder'),
      props.placeholder,
      'placeholder-attribute has incorrect value'
    );
  });

  it('should create a password field', () => {
    const wrapper = render(
      <div id="root">
        <Input type="password" />
      </div>
    );
    const inputElement = wrapper.find('input');
    assert.strictEqual(
      inputElement.attr('type'), 'password',
      'input is not of type password'
    );
  });
});
