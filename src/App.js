import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './components/Header';

import './App.css';

// Routes
import { routes } from './routes';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Header/>

        { routes.map((route) => (
          <Route key={route.path} {...route} />
        ) ) }
      </div>
    );
  }
}

export default App;
