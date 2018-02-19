import React, { Component } from 'react';
import { Row, Col, Input, Button, Icon } from 'antd';
import Header from './Header';

import '../assets/styles/css/resume.css';

class UserInfo extends Component {
  render() {
    const {name, designation, positions} = this.props;
    return (
      <div className="profile">
        <h3>Welcome {name.split(" ")[0]} !</h3>
        <Col sm={24} md={12}>
          <p class="text">We see that you are an..</p>
          <p id="designation">{designation}</p>
        </Col>
        <Col sm={24} md={12}>
          <p class="text" id="positions">
            <Icon type="dingding" /> {positions.length} Position(s) open -
          </p>
          <ul>
            {positions.map(position => (<li>{position}</li>))}
          </ul>
        </Col>
      </div>
    );
  }
}

class Resume extends Component {
  render() {
    return (
      <div className="gradient">
        <Header/>
        <Row className="resume">
          <Col offset={4} span={16}>
            <UserInfo name="Sam Smith"
              designation="Engineering Manager - Buzzfeed - New York, NY - "
              positions={["Django Lead", "UX Designer Lead"]}
            />
          </Col>
          <Col className="upload-box" offset={4} span={16}>
            <Col span={24}>
              <h2>Who would you like to reach out to?</h2>
              <h4>Paste Candidate URL</h4>
            </Col>
            <Col xs={24} sm={20}>
              <Input placeholder="http://www.linkedin.com/in/amykeys"/>
            </Col>
            <Col xs={24} sm={2}>
              <Button>Generate Email</Button>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Resume;
