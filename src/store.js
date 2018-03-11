import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { createEpicMiddleware } from 'redux-observable';

import reducers from './reducers';

// Epics
import rootEpic from './epics';


export const history = createHistory();


// Epic Middleware
const epicMiddleware = createEpicMiddleware(rootEpic);


// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(createLogger(), routerMiddleware(history), epicMiddleware))
);


export default store;
