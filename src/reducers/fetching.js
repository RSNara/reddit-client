import * as Constants from '../constants';

export default function fetching(state = true, action) {
  switch (action.type) {
  case Constants.FETCHING:
    return true;
  case Constants.DONE_FETCHING:
    return false;
  default:
    return state;
  }
}
