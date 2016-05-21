import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Main from '../containers/main';
import SubredditThreads from '../containers/subreddit-threads';
import SubredditThreadComments from '../containers/subreddit-thread-comments';
import { SUBREDDITS } from '../constants';
import {
  doesStateHaveSubredditThreadComments,
  getSubredditThreads,
} from '../selectors/main';
import * as AC from '../action-creators';

export default (store) => (
  <Route path="/" component={ Main } onEnter={fetchDefaultSubreddits(store)}>
    <IndexRedirect to="r/AskReddit" />
    <Route path="r/:subreddit(/:filter)" component={SubredditThreads} onEnter={fetchSubredditThreads(store)} />
    <Route path="r/:subreddit/:thread/comments" component={SubredditThreadComments} onEnter={fetchSubredditThreadComments(store)} />
  </Route>
);

function fetchDefaultSubreddits(store) {
  return () => store.dispatch({ type: SUBREDDITS.FETCH_DEFAULT });
}

function fetchSubredditThreads(store) {
  return ({ params: { subreddit, filter = 'hot' } = {} }) => {
    // Always re-fetch subreddit threads when you visit route
    const count = getSubredditThreads(store, subreddit).size || 25;
    store.dispatch(AC.fetchSubredditThreads(subreddit, count, undefined, filter));
  };
}

function fetchSubredditThreadComments(store) {
  return ({ params: { subreddit, thread } = {} }) => {
    const state = store.getState();
    const shouldFetchSubredditThreadComments = ! doesStateHaveSubredditThreadComments(state, subreddit, thread);
    if (shouldFetchSubredditThreadComments) {
      store.dispatch({
        type: SUBREDDITS.FETCH_THREAD_COMMENTS,
        payload: {
          subreddit: subreddit,
          thread: thread,
        },
      });
    }
  };
}
