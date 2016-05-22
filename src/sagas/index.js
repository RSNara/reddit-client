import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { SUBREDDITS } from '../constants';
import { expect } from 'chai';
import {
  saveDefaultSubreddits,
  saveSubredditThreads,
  saveSubredditThreadComments,
  saveSubredditThreadCommentsToCache,
  saveSubredditLastFetchedThreadName,
} from '../action-creators';
import { createCommentTree } from '../utils';
import { last } from 'ramda';

export default function* root() {
  yield [
    takeEvery(SUBREDDITS.FETCH_DEFAULT, fetchDefaultSubreddits),
    takeEvery(SUBREDDITS.FETCH_THREADS, fetchSubredditThreads),
    takeEvery(SUBREDDITS.FETCH_THREAD_COMMENTS, fetchSubredditThreadComments),
    takeEvery(SUBREDDITS.FETCH_THREAD_MORE_COMMENTS, fetchSubredditThreadMoreComments),
    takeEvery(SUBREDDITS.FETCH_THREAD_MORE_ROOT_COMMENTS, fetchSubredditThreadMoreRootComments),
  ];
}

function* fetchDefaultSubreddits() {
  const response = yield fetch('/reddit/subreddits');
  const subreddits = yield response.json();
  yield put(saveDefaultSubreddits(subreddits.data.children));
}

function* fetchSubredditThreads({ payload: { subreddit, count, after, filter } }) {
  const response = yield fetch(`/reddit/r/${subreddit}/${filter}?count=${count}&after=${after}`);
  const threads = yield response.json();
  yield put(saveSubredditThreads(subreddit, threads.data.children, filter));
  yield put(saveSubredditLastFetchedThreadName(subreddit, last(threads.data.children).data.name, filter));
}

function* fetchSubredditThreadComments({ payload: { subreddit, thread } }) {
  const response = yield fetch(`/reddit/r/${subreddit}/comments/${thread}`);
  const comments = yield response.json();
  expect(comments).to.have.length(2); // first item is the thread
  yield put(saveSubredditThreads(subreddit, comments[0].data.children, null));
  yield put(saveSubredditThreadComments(subreddit, thread, comments[1].data.children));
}

function fetchMoreComments(linkId, children) {
  const form = new FormData();
  form.append('link_id', linkId);
  form.append('children', children);
  return fetch('/reddit/api/morechildren.json', {
    method: 'POST',
    body: form,
  }).then(
    response => response.json()
  );
}

function* fetchSubredditThreadMoreComments({ payload: { linkId, children, subreddit, thread } }) {
  const moreChildren = yield fetchMoreComments(linkId, children);
  yield put(saveSubredditThreadCommentsToCache(subreddit, thread, createCommentTree(moreChildren)));
}

function* fetchSubredditThreadMoreRootComments({ payload: { linkId, children, subreddit, thread } }) {
  const moreChildren = yield fetchMoreComments(linkId, children);
  yield put(saveSubredditThreadComments(subreddit, thread, createCommentTree(moreChildren)));
}
