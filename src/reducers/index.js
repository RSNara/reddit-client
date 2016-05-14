import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import session from './session';
import subreddits from './subreddits';

const rootReducer = combineReducers({
  subreddits,
  session,
  counter,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
