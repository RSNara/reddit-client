import { Map } from 'immutable';
import { SUBREDDITS } from '../constants';

function subreddits(state = Map(), action) {
  switch (action.type) {
  case SUBREDDITS.SAVE_DEFAULT:
    return state.set('default', action.payload.subreddits);
  default:
    return state;
  }
}

export default subreddits;
