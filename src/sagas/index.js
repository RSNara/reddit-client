import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { SUBREDDITS } from '../constants';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  saveDefaultSubreddits,
  saveSubredditThreads,
  saveSubredditThreadComments,
  saveSubredditThreadCommentsToCache,
} from '../action-creators';
import { createCommentTree } from '../utils';

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
  yield put(saveDefaultSubreddits(fromJS(subreddits.data.children)));
}

function* fetchSubredditThreads({ payload: { subreddit, count, after, filter } }) {
  const response = yield fetch(`/reddit/r/${subreddit}/${filter}?count=${count}&after=${after}`);
  const threads = yield response.json();
  yield put(saveSubredditThreads(subreddit, filter, fromJS(threads.data.children)));
}

function* fetchSubredditThreadComments({ payload: { subreddit, thread } }) {
  const response = yield fetch(`/reddit/r/${subreddit}/comments/${thread}`);
  const comments = yield response.json();
  expect(comments).to.have.length(2); // first item is the thread
  yield put(saveSubredditThreads(subreddit, fromJS(comments[0].data.children)));
  yield put(saveSubredditThreadComments(subreddit, thread, fromJS(comments[1].data.children)));
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
  yield put(saveSubredditThreadCommentsToCache(subreddit, thread, fromJS(createCommentTree(moreChildren))));
}

function* fetchSubredditThreadMoreRootComments({ payload: { linkId, children, subreddit, thread } }) {
  const moreChildren = yield fetchMoreComments(linkId, children);
  yield put(saveSubredditThreadComments(subreddit, thread, fromJS(createCommentTree(moreChildren))));
}
