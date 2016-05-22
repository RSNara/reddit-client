import { Map, Set, fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { SUBREDDITS, CHILDREN_EXPANDED, THUMBNAIL_EXPANDED } from '../constants';

const subreddits = handleActions({

  [SUBREDDITS.SAVE_DEFAULT]: (state, { payload }) => {
    return state.set('default', fromJS(payload.subreddits));
  },

  [SUBREDDITS.SAVE_THREADS]: (state, { payload }) => {
    const { subreddit, threads, filter } = payload;
    const filterSet = filter ? Set.of(filter) : Set();
    return state.updateIn(
      ['threads', subreddit], indexedUpsert(fromJS(threads).map(
        (thread) => thread.set('filters', filterSet)
      ))
    );
  },

  [SUBREDDITS.SAVE_THREAD_COMMENTS]: (state, { payload }) => {
    const { subreddit, thread, comments } = payload;
    return state.updateIn(
      ['comments', subreddit, thread], indexedUpsert(fromJS(comments))
    );
  },

  [SUBREDDITS.SAVE_THREAD_COMMENTS_TO_CACHE]: (state, { payload }) => {
    const { subreddit, thread, comments } = payload;
    return state.updateIn(
      ['subredditCommentCache', subreddit, thread], indexedUpsert(fromJS(comments))
    );
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

  [SUBREDDITS.LAST_FETCHED_THREAD_NAME]: (state, { payload }) => {
    const { subreddit, threadName, filter } = payload;
    return state.setIn(['lastFetchedThreadName', subreddit, filter], threadName);
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
