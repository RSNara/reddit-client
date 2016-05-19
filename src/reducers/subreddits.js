import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { SUBREDDITS } from '../constants';

const subreddits = handleActions({

  [SUBREDDITS.SAVE_DEFAULT]: (state, { payload }) => (
    state.set('default', payload.subreddits)
  ),

  [SUBREDDITS.SAVE_THREADS]: (state, { payload }) => {
    const { subreddit, threads } = payload;
    return state.updateIn(['threads', subreddit], indexedUpsert(threads));
  },

  [SUBREDDITS.SAVE_THREAD_COMMENTS]: (state, { payload }) => {
    const { subreddit, thread, comments } = payload;
    return state.updateIn(['comments', subreddit, thread], indexedUpsert(comments));
  },

  [SUBREDDITS.SAVE_THREAD_COMMENTS_TO_CACHE]: (state, { payload }) => {
    const { subreddit, thread, comments } = payload;
    return state.updateIn(['subredditCommentCache', subreddit, thread], indexedUpsert(comments));
  },

}, Map());

function indexedUpsert(items) {
  return (old = Map()) => (
    items.reduce((table, item) => (
      table.set(item.getIn(['data', 'id']), item)
    ), old)
  );
}

export default subreddits;
