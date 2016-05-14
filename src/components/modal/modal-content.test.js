import assert from 'assert';
import { render } from 'enzyme';

import React from 'react';

import ModalContent from './modal-content';

describe('ModalContent Component', () => {
  it('should create a ModalContent', () => {
    const wrapper = render(<ModalContent>Hello world</ModalContent>);
    assert.equal(wrapper.text(), 'Hello world');
  });
});
