import { createSelector } from 'reselect';
import { List } from 'immutable';

export const getDefaultSubreddits = (state) => state.subreddits.get('default', List());

export const getDefaultSubredditTitles = createSelector(
  getDefaultSubreddits,
  (subreddits) => subreddits.map(sub => sub.getIn(['data', 'title']))
);
