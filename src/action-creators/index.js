import { SUBREDDITS } from '../constants';

export function saveDefaultSubreddits(subreddits) {
  return {
    type: SUBREDDITS.SAVE_DEFAULT,
    payload: { subreddits },
  };
}

export function saveSubredditThreads(subreddit, threads, filter) {
  return {
    type: SUBREDDITS.SAVE_THREADS,
    payload: {
      filter: filter,
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

export function fetchSubredditThreadMoreComments(subreddit, thread, linkId, children) {
  return {
    type: SUBREDDITS.FETCH_THREAD_MORE_COMMENTS,
    payload: {
      linkId: linkId,
      children: children,
      subreddit: subreddit,
      thread: thread,
    },
  };
}

export function saveSubredditThreadCommentsToCache(subreddit, thread, comments) {
  return {
    type: SUBREDDITS.SAVE_THREAD_COMMENTS_TO_CACHE,
    payload: {
      comments: comments,
      subreddit: subreddit,
      thread: thread,
    },
  };
}

export function toggleSubredditThreadCommentExpandChildren(subreddit, thread, comment) {
  return {
    type: SUBREDDITS.TOGGLE_THREAD_COMMENT_EXPAND_CHILDREN,
    payload: {
      subreddit: subreddit,
      thread: thread,
      comment: comment,
    },
  };
}

export function toggleSubredditThreadCardExpandThumbnail(subreddit, thread) {
  return {
    type: SUBREDDITS.TOGGLE_THREAD_CARD_EXPAND_THUMBNAIL,
    payload: {
      subreddit: subreddit,
      thread: thread,
    },
  };
}

export function fetchSubredditThreadMoreRootComments(subreddit, thread, linkId, children) {
  return {
    type: SUBREDDITS.FETCH_THREAD_MORE_ROOT_COMMENTS,
    payload: {
      linkId: linkId,
      children: children,
      subreddit: subreddit,
      thread: thread,
    },
  };
}

export function deleteSubredditThreadComment(subreddit, thread, comment) {
  return {
    type: SUBREDDITS.DELETE_THREAD_COMMENT,
    payload: {
      subreddit: subreddit,
      thread: thread,
      comment: comment,
    },
  };
}

export function fetchSubredditThreads(subreddit, count = 25, after = '', filter) {
  return {
    type: SUBREDDITS.FETCH_THREADS,
    payload: {
      filter: filter,
      subreddit: subreddit,
      count: count,
      after: after,
    },
  };
}
