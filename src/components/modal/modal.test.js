import assert from 'assert';
import { render } from 'enzyme';

import React from 'react';

import Modal from './modal';

describe('Modal Component', () => {
  it('should create a modal', () => {
    const wrapper = render(<Modal>Hello world</Modal>);
    assert.strictEqual(wrapper.text(), 'Hello world');
    assert.strictEqual(wrapper.children().css('visibility'), 'hidden');
  });

  it('should create a visible modal', () => {
    const wrapper = render(<Modal isVisible>Hello world</Modal>);
    assert.strictEqual(wrapper.children().css('visibility'), 'visible');
  });
});
