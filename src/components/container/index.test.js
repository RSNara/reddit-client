import { assert } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import Container from './index';

describe('Container', () => {
  it('should create an container 1 unit wide', () => {
    const wrapper = render(<Container size={1}>Hello world</Container>);

    assert.isOk(wrapper.children().length, 'container not created');
    assert.strictEqual(wrapper.text(), 'Hello world',
      'child contents not found');
    assert.isOk(wrapper.find('.max-width-1').length, 'max-width class not found');
  });

  it('should create a centered container', () => {
    const wrapper = render(
      <Container center>Success!</Container>
    );
    assert.isOk(wrapper.find('.mx-auto').length);
  });
});
