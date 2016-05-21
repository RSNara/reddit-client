import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import session from './session';
import subreddits from './subreddits';

const rootReducer = combineReducers({
  subreddits,
  session,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
