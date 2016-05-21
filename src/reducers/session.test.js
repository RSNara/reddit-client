import fireAction from '../utils/fire-action';
import sessionReducer from '../reducers/session';
import test from 'ava';

import {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} from '../../src/constants/index';

import { Map } from 'immutable';

test.beforeEach(t => {
  t.context.state = sessionReducer(undefined, {});
});

test('initial state should be a Map', t => {
  t.true(Map.isMap(t.context.state));
});

test('LOGIN_USER_PENDING should set loading to true', t => {
  t.context.state = fireAction(sessionReducer, t.context.state, LOGIN_USER_PENDING);
  t.true(t.context.state.get('isLoading'), 'isLoading should be true');
  t.falsy(t.context.state.get('token'), 'token should be falsy');
});

test('LOGIN_USER_SUCCESS should set the token', t => {
  t.context.state = fireAction(sessionReducer, t.context.state, LOGIN_USER_SUCCESS, { token: 1234 });
  t.false(t.context.state.get('isLoading'), 'isLoading should be false');
  t.false(t.context.state.get('hasError'), 'there should be no error');
  t.is(t.context.state.get('token'), 1234, 'token should be set correctly');
});

test('LOGIN_USER_ERROR should show an error', t => {
  t.context.state = fireAction(sessionReducer, t.context.state, LOGIN_USER_ERROR);
  t.false(t.context.state.get('isLoading'), 'isLoading should be false');
  t.true(t.context.state.get('hasError'), '`hasError` should be true when there is an error');
});

test('LOGOUT_USER should clear the token', t => {
  t.context.state = fireAction(sessionReducer, t.context.state, LOGIN_USER_SUCCESS, { token: 1234 });
  t.is(t.context.state.get('token'), 1234, 'token should be set correctly');
  t.context.state = fireAction(sessionReducer, t.context.state, LOGOUT_USER);
  t.false(t.context.state.get('isLoading'), 'isLoading should be false');
  t.false(t.context.state.get('hasError'), 'there should be no error');
  t.falsy(t.context.state.get('token'), 'token should be cleared');
});
