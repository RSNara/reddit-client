import { assert } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import Alert from './index';

describe('Alert', () => {
  it('should create an alert', () => {
    const wrapper = render(<Alert>Success!</Alert>);

    assert.isOk(wrapper.children().length, 'alert not created');
    assert.strictEqual(wrapper.text(), 'Success!',
      'child contents not found');
  });

  it('should have a custom attribute', () => {
    const wrapper = render(
      <Alert data-some-attr="some text">Success!</Alert>
    );

    assert.isOk(wrapper.find('[data-some-attr]').length);
  });

  it('should have a custom css class', () => {
    const wrapper = render(
      <Alert className="bg-green">Success!</Alert>
    );

    assert.isOk(wrapper.find('.bg-green').length);
  });

  it('should have an error background', () => {
    const wrapper = render(
      <Alert status="error">Failed!</Alert>
    );

    assert.isOk(wrapper.find('.bg-red').length);
  });
});
