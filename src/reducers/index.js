import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import resumeReducer from './resume';

export default combineReducers({
  resume: resumeReducer,
  routing: routerReducer
});
