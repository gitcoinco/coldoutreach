import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './assets/styles/css/base.css';

// Routes
import { routes } from './routes';

class App extends Component {
  render() {
    return (
      <div className="main">
        { routes.map((route) => (
          <Route key={route.path} {...route} />
        ) ) }
      </div>
    );
  }
}

export default App;
