import React, { Component } from 'react';
import { Row, Col } from 'antd';

import logo from '../assets/img/coldoutreach-logo.png';
import '../assets/styles/css/header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Row>
          <Col span={22} offset={2}>
            <img src={logo} alt="Coldoutreach Logo"/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
