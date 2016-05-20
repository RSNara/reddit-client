import React from 'react';
import { Route } from 'react-router';
import Main from '../containers/main';
import SubredditThreads from '../containers/subreddit-threads';
import SubredditThreadComments from '../containers/subreddit-thread-comments';
import { SUBREDDITS } from '../constants';
import {
  doesStateHaveSubredditThreadComments,
  getSubredditThreads,
} from '../selectors/main';

export default (store) => (
  <Route path="/" component={ Main } onEnter={fetchDefaultSubreddits(store)}>
    <Route path="r/:subreddit" component={SubredditThreads} onEnter={fetchSubredditThreads(store)} />
    <Route path="r/:subreddit/:thread/comments" component={SubredditThreadComments} onEnter={fetchSubredditThreadComments(store)} />
  </Route>
);

function fetchDefaultSubreddits(store) {
  return () => store.dispatch({ type: SUBREDDITS.FETCH_DEFAULT });
}

function fetchSubredditThreads(store) {
  return ({ params: { subreddit } = {} }) => {
    // Always re-fetch subreddit threads when you visit route
    store.dispatch({
      type: SUBREDDITS.FETCH_THREADS,
      payload: {
        subreddit: subreddit,
        count: getSubredditThreads(store, subreddit).size || 25,
      },
    });
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
