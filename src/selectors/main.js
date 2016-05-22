import { createSelector } from 'reselect';
import { List, Map, Set } from 'immutable';
import { curry, complement, comparator, concat } from 'ramda';

export const getDefaultSubreddits = (state) => state.subreddits.get('default', List());

export const getDefaultSubredditTitles = createSelector(
  getDefaultSubreddits,
  (subreddits) => subreddits.map(sub => sub.getIn(['data', 'display_name']))
);

export const getSubredditThread = (state, subreddit, id) => state.subreddits.getIn(['threads', subreddit, id]);
export const getSubredditThreads = (state, subreddit) => {
  const subreddits = (state.subreddits || Map());
  return subreddits.getIn(['threads', subreddit], Map()).toList();
};

export const filterSubredditThreads = (threads, filter) => {
  return threads.filter(thread => thread.get('filters', Set()).has(filter));
};

export const threadHasGreaterScore = comparator(
  (a, b) => a.getIn(['data', 'score']) > b.getIn(['data', 'score'])
);

export const threadIsStickied = (thread) => (
  thread.getIn(['data', 'stickied'], false)
);

export const getSortedSubredditThreads = createSelector(
  getSubredditThreads, (threads) => threads.sort(threadHasGreaterScore)
);

export const getStickiedSubredditThreads = createSelector(
  getSortedSubredditThreads, (threads) => threads.filter(threadIsStickied)
);

export const getNonStickiedSubredditThreads = createSelector(
  getSortedSubredditThreads, (threads) => threads.filter(complement(threadIsStickied))
);

export const getOrderedSubredditThreads = createSelector(
  getStickiedSubredditThreads, getNonStickiedSubredditThreads, concat
);

export const getFilteredOrderedSubredditThreads = (subreddit, thread, filter) => (
  filterSubredditThreads(getOrderedSubredditThreads(subreddit, thread), filter)
);

export const doesStateHaveSubredditThreads = (state, subreddit) => state.subreddits.hasIn(['threads', subreddit]);

export const getSubObject = (map, fields) => map.reduce((table, value, key) => (
  fields.includes(key) ? table.set(key, value) : table
), Map());

export const getFieldsOfSubredditThread = (state, subreddit, threadId, fields) => (
  getSubObject((getSubredditThread(state, subreddit, threadId) || Map()).get('data', Map()), fields)
);

export const getFieldsOfSubredditThreads = (state, subreddit, fields) => (
  getSubredditThreads(state, subreddit).map(thread => getSubObject(thread.get('data'), fields))
);

export const doesStateHaveSubredditThreadComments = (state, subreddit, thread) => state.subreddits.hasIn(['comments', thread]);
export const getSubredditThreadComments = (state, subreddit, thread) => (
  state.subreddits.getIn(['comments', subreddit, thread], Map()).toList()
);

export const getFieldsOfSubredditThreadComments = (state, subreddit, thread, fields) => (
  getSubredditThreadComments(state, subreddit, thread).map(comment => getSubObject(comment.get('data'), fields))
);

export const getSubredditThreadCommentCache = (state, subreddit, thread) => (
  state.subreddits.getIn(['subredditCommentCache', subreddit, thread], Map())
);

export const getSubredditThreadExpandedChildren = (state, subreddit, thread) => (
  state.subreddits.getIn(['expandChildren', subreddit, thread], Map())
);

export const getSubredditThreadCardExpandedThumbnails = curry((state, subreddit) => (
  state.subreddits.getIn(['expandThumbnail', subreddit], Map())
));
