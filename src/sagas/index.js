import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { SUBREDDITS } from '../constants';
import { expect } from 'chai';
import { fromJS } from 'immutable';
import {
  saveDefaultSubreddits,
  saveSubredditThreads,
  saveSubredditThreadComments,
} from '../action-creators';

export default function* root() {
  yield [
    takeEvery(SUBREDDITS.FETCH_DEFAULT, fetchDefaultSubreddits),
    takeEvery(SUBREDDITS.FETCH_THREADS, fetchSubredditThreads),
    takeEvery(SUBREDDITS.FETCH_THREAD_COMMENTS, fetchSubredditThreadComments),
  ];
}

function* fetchDefaultSubreddits() {
  const response = yield fetch('/reddit/subreddits');
  const subreddits = yield response.json();
  yield put(saveDefaultSubreddits(fromJS(subreddits.data.children)));
}

function* fetchSubredditThreads({ payload: { subreddit } }) {
  const response = yield fetch(`/reddit/r/${subreddit}`);
  const threads = yield response.json();
  yield put(saveSubredditThreads(subreddit, fromJS(threads.data.children)));
}

function* fetchSubredditThreadComments({ payload: { subreddit, thread } }) {
  const response = yield fetch(`/reddit/r/${subreddit}/comments/${thread}`);
  const comments = yield response.json();
  expect(comments).to.have.length(2);
  yield put(saveSubredditThreadComments(subreddit, thread, fromJS(comments[1].data.children)));
}
