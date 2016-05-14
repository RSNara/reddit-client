import { assert } from 'chai';
import React from 'react';
import { render } from 'enzyme';
import Content from './index';

describe('Content', () => {
  it('should render html inside a <main> tag', () => {
    const wrapper = render(
      <Content isVisible>Hello world</Content>
    );
    const mainElement = wrapper.find('main');

    assert.isOk(mainElement.length, 'main element not found');
    assert.strictEqual(mainElement.text(), 'Hello world',
      'child contents not found');
  });

  it('should not render content if set to not visible', () => {
    const wrapper = render(
      <Content isVisible={false}>
        Hello world
      </Content>);
    const mainElement = wrapper.find('main');

    assert.strictEqual(mainElement.text(), '',
      'child contents not found');
  });
});
