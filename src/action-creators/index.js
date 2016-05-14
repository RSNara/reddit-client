import { SUBREDDITS } from '../constants';

export function saveDefaultSubreddits(subreddits) {
  return {
    type: SUBREDDITS.SAVE_DEFAULT,
    payload: { subreddits },
  };
}

export function saveSubredditThreads(subreddit, threads) {
  return {
    type: SUBREDDITS.SAVE_THREADS,
    payload: {
      subreddit: subreddit,
      threads: threads,
    },
  };
}

export function saveSubredditThreadComments(subreddit, thread, comments) {
  return {
    type: SUBREDDITS.SAVE_THREAD_COMMENTS,
    payload: {
      subreddit: subreddit,
      thread: thread,
      comments: comments,
    },
  };
}
