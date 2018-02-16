import React, { Component } from 'react';

import logo from '../img/coldoutreach-logo.png';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="logo">
        <img src={logo} alt="Coldoutreach Logo" />
      </div>
    );
  }
}

export default Header;
