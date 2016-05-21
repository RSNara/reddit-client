import fireAction from './fire-action';
import test from 'ava';

test('should fire the provided action against the provided reducer', t => {
  const INITIAL_STATE = {
    test: false,
  };

  const mockReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'test':
      state.test = true;
      return state;

    default:
      return state;
    }
  };

  const state = fireAction(mockReducer, INITIAL_STATE, 'test');
  t.true(state.test, 'failed to set state correctly');
});
