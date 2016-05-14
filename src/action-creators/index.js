import { SUBREDDITS } from '../constants';

export function saveDefaultSubreddits(subreddits) {
  return {
    type: SUBREDDITS.SAVE_DEFAULT,
    payload: { subreddits },
  };
}
