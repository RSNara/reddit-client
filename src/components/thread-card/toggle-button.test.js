import React from 'react';
import test from 'ava';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ToggleButton from './toggle-button';

test('should show the correct symbol for "less"', () => {
  const btn = shallow(<ToggleButton value onToggle={() => undefined}/>);
  expect(btn.text()).to.contain('-');
});

test('should show the correct symbol for "more"', () => {
  const btn = shallow(<ToggleButton value={false} onToggle={() => undefined}/>);
  expect(btn.text()).to.contain('+');
});

test('should fire onToggle on click + preventDefault event propagation', t => {
  t.context.toggled = false;
  t.context.defaultPrevented = false;

  const onToggle = () => { t.context.toggled = true; };
  const preventDefault = () => { t.context.defaultPrevented = true; };

  const btn = shallow(<ToggleButton value={false} onToggle={onToggle}/>);

  btn.find('a').simulate('click', { preventDefault });

  t.true(t.context.toggled, 'onToggle did not fire');
  t.true(t.context.defaultPrevented, 'preventDefault not fired');
});
