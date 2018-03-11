import { combineEpics } from 'redux-observable';

// Epics
import { epics as resumeEpics } from './resume';


const rootEpic = combineEpics(
  resumeEpics
);


export default rootEpic;
