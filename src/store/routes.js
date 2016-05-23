import React from 'react';
import { head } from 'ramda';
import { Route, IndexRedirect, Redirect } from 'react-router';
import { push } from 'react-router-redux';
import Main from '../containers/main';
import Subreddit from '../containers/subreddit';
import SubredditThreadComments from '../containers/subreddit-thread-comments';
import { SUBREDDITS, FRONT_PAGE_NAME, VALID_FILTERS } from '../constants';
import {
  doesStateHaveSubredditThreadComments,
  getSubredditThreads,
} from '../selectors/main';
import * as AC from '../action-creators';

export default (store) => (
  <Route path="/" component={ Main } onEnter={fetchDefaultSubreddits(store)}>
    <IndexRedirect to="/hot" />
    <Route path=":filter" component={Subreddit(FRONT_PAGE_NAME)} onEnter={fetchFrontPageThreads(store)} />
    <Redirect from="r/:subreddit" to="r/:subreddit/hot" />
    <Route path="r/:subreddit/:filter" component={Subreddit()} onEnter={fetchSubredditThreads(store)} />
    <Route path="r/:subreddit/:thread/comments" component={SubredditThreadComments} onEnter={fetchSubredditThreadComments(store)} />
  </Route>
);

/**
 * @todo The `setTimeout` fixes the redirect. Otherwise, the component's params
 * do not contain the updated route. Investigate this.
 *
 * @todo Reproduce by trying to change route in an on enter.
 */

function fetchFrontPageThreads(store) {
  return ({ params: { filter }}) => setTimeout(() => {
    if (! VALID_FILTERS.includes(filter)) {
      return store.dispatch(push(`/${head(VALID_FILTERS)}`));
    }
    return dispatchFetchSubredditThreads(store, FRONT_PAGE_NAME, filter);
  }, 0);
}

function fetchDefaultSubreddits(store) {
  return () => store.dispatch({ type: SUBREDDITS.FETCH_DEFAULT });
}

function fetchSubredditThreads(store) {
  return ({ params: { subreddit, filter } = {} }) => setTimeout(() =>{
    if (! VALID_FILTERS.includes(filter)) {
      return store.dispatch(push(`/r/${subreddit}/${head(VALID_FILTERS)}`));
    }
    return dispatchFetchSubredditThreads(store, subreddit, filter);
  }, 0);
}

function dispatchFetchSubredditThreads(store, subreddit, filter) {
  const count = getSubredditThreads(store, subreddit).size || 25;
  return store.dispatch(AC.fetchSubredditThreads(
    subreddit, count, undefined, filter
  ));
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
