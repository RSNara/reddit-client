import { Map, Set } from 'immutable';
import { handleActions } from 'redux-actions';
import { SUBREDDITS, CHILDREN_EXPANDED, THUMBNAIL_EXPANDED } from '../constants';

const subreddits = handleActions({

  [SUBREDDITS.SAVE_DEFAULT]: (state, { payload }) => (
    state.set('default', payload.subreddits)
  ),

  [SUBREDDITS.SAVE_THREADS]: (state, { payload }) => {
    const { subreddit, threads, filter } = payload;
    return state.updateIn(['threads', subreddit], indexedUpsert(threads.map(
      (thread) => thread.set('filters', Set.of(filter))
    )));
  },

  [SUBREDDITS.SAVE_THREAD_COMMENTS]: (state, { payload }) => {
    const { subreddit, thread, comments } = payload;
    return state.updateIn(['comments', subreddit, thread], indexedUpsert(comments));
  },

  [SUBREDDITS.SAVE_THREAD_COMMENTS_TO_CACHE]: (state, { payload }) => {
    const { subreddit, thread, comments } = payload;
    return state.updateIn(['subredditCommentCache', subreddit, thread], indexedUpsert(comments));
  },

  [SUBREDDITS.TOGGLE_THREAD_COMMENT_EXPAND_CHILDREN]: (state, { payload }) => {
    const { subreddit, thread, comment } = payload;
    return state.updateIn(
      ['expandChildren', subreddit, thread, comment], (x = CHILDREN_EXPANDED) => !x
    );
  },

  [SUBREDDITS.DELETE_THREAD_COMMENT]: (state, { payload }) => {
    const { subreddit, thread, comment } = payload;
    return state.deleteIn(['comments', subreddit, thread, comment]);
  },

  [SUBREDDITS.TOGGLE_THREAD_CARD_EXPAND_THUMBNAIL]: (state, { payload }) => {
    const { subreddit, thread } = payload;
    return state.updateIn(
      ['expandThumbnail', subreddit, thread], (x = THUMBNAIL_EXPANDED) => !x
    );
  },

}, Map());

function indexedUpsert(items) {
  return (old = Map()) => (
    items.reduce((table, item) => (
      table.update(item.getIn(['data', 'id']), (oldItem) => (
        oldItem ? oldItem.mergeDeep(item) : item
      ))
    ), old)
  );
}

export default subreddits;
