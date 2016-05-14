import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { SUBREDDITS } from '../constants';
import { fromJS } from 'immutable';
import { saveDefaultSubreddits } from '../action-creators';

export default function* root() {
  yield [
    takeEvery(SUBREDDITS.FETCH_DEFAULT, fetchDefaultSubreddits),
  ];
}

function* fetchDefaultSubreddits() {
  const response = yield fetch('/reddit/subreddits');
  const subreddits = yield response.json();
  yield put(saveDefaultSubreddits(fromJS(subreddits.data.children)));
}
