import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { SUBREDDITS } from '../constants';

const subreddits = handleActions({

  [SUBREDDITS.SAVE_DEFAULT]: (state, { payload }) => (
    state.set('default', payload.subreddits)
  ),

  [SUBREDDITS.SAVE_THREADS]: (state, { payload }) => {
    const { subreddit, threads } = payload;
    return state.setIn(['threads', subreddit], threads);
  },

  [SUBREDDITS.SAVE_THREAD_COMMENTS]: (state, { payload }) => {
    const { subreddit, thread, comments } = payload;
    return state.setIn(['comments', subreddit, thread], comments);
  },

}, Map());

export default subreddits;
