import React from 'react';
import { Route } from 'react-router';
import Main from '../containers/Main';
import { SUBREDDITS } from '../constants';

export default (store) => (
  <Route path="/" component={ Main } onEnter={fetchDefaultSubreddits(store)} />
);

function fetchDefaultSubreddits(store) {
  return () => store.dispatch({ type: SUBREDDITS.FETCH_DEFAULT });
}
