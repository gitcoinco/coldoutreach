import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'react-router-redux';

// Providers
import { LocaleProvider } from 'antd';
import { Provider as ReduxProvider } from 'react-redux';
import enUS from 'antd/lib/locale-provider/en_US';

import store, { history } from './store';

import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <App/>
      </ConnectedRouter>
    </ReduxProvider>
  </LocaleProvider>,
  document.getElementById('coldoutreach')
);

registerServiceWorker();
