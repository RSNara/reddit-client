import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

export const getDefaultSubreddits = (state) => state.subreddits.get('default', List());

export const getDefaultSubredditTitles = createSelector(
  getDefaultSubreddits,
  (subreddits) => subreddits.map(sub => sub.getIn(['data', 'display_name']))
);

export const getSubredditThreads = (state, subreddit) => state.subreddits.getIn(['threads', subreddit], List());
export const doesStateHaveSubredditThreads = (state, subreddit) => state.subreddits.hasIn(['threads', subreddit]);

export const getSubObject = (map, fields) => map.reduce((table, value, key) => (
  fields.includes(key) ? table.set(key, value) : table
), Map());

export const getFieldsOfSubredditThreads = (state, subreddit, fields) => (
  getSubredditThreads(state, subreddit).map(thread => getSubObject(thread.get('data'), fields))
);

export const doesStateHaveSubredditThreadComments = (state, subreddit, thread) => state.subreddits.hasIn(['comments', thread]);
export const getSubredditThreadComments = (state, subreddit, thread) => (
  state.subreddits.getIn(['comments', subreddit, thread], List())
);

export const getFieldsOfSubredditThreadComments = (state, subreddit, thread, fields) => (
  getSubredditThreadComments(state, subreddit, thread).map(comment => getSubObject(comment.get('data'), fields))
);
