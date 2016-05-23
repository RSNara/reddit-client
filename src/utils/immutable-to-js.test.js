import immutableToJS from './immutable-to-js';
import { fromJS } from 'immutable';
import test from 'ava';

const mockState = {
  state: {
    name: 'John',
    sons: [{
      name: 'Lill John',
      age: 12,
    }, {
      name: 'Big John',
      age: 34,
    }],
  },
};

test('should ignore regularJS structures', t => {
  t.deepEqual(mockState, immutableToJS(mockState));
});

test('should convert Immutable structures to JS structures', t => {
  const stateWithImmutable = {
    state: fromJS(mockState.state),
  };
  t.deepEqual(mockState, immutableToJS(stateWithImmutable));
});
