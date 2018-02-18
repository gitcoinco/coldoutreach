import React, { Component } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import Header from './Header';
import Card from './landing/Card';
import Info from './landing/Info';
import Testimonial from './landing/Testimonial';

import '../assets/styles/css/home.css';
import image from '../assets/img/dummy.svg';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="gradient">
          <Header/>
          <Row className="landing-header">
            <Col className="left" offset={2} md={20} lg={5}>
              <h1 class="title">A Better Way to Find Talent</h1>
              <p class="content">
                <span>Instantly create custom</span>
                <span>outreach emails tailored to</span>
                <span>each candidate.</span>
              </p>
              <Button type="primary" href="/resume">
                <Icon type="rocket" /> Get Started
              </Button>
            </Col>
            <Col className="right" offset={2} md={20} lg={{span:11, offset:4}}>
              <Row>
                <Col offset={4} xs={16} sm={{span:8, offset:0}}>
                  <Card title="FIND CANDIDATE" image={image}/>
                </Col>
                <Col offset={4} xs={16} sm={{span:8, offset:0}}>
                  <Card title="GENERATE EMAIL" image={image}/>
                </Col>
                <Col offset={4} xs={16} sm={{span:8, offset:0}}>
                  <Card title="REACH OUT" image={image}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row className="idea">
          <Col offset={2} span={22}>
            <h2>Recruit the Smart Way</h2>
          </Col>
          <Col offset={2} sm={20} md={6}>
            <Info title="Lorem ipsum dolor sit amet"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam" image={image}/>
          </Col>
          <Col offset={2} sm={20} md={{span:6, offset:1}}>
            <Info title="Lorem ipsum dolor sit"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam" image={image}/>
          </Col>
          <Col offset={2} sm={20} md={{span:6, offset:1}}>
            <Info title="Lorem ipsum dolor sit"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam" image={image}/>
          </Col>
        </Row>
        <Row>
          <Col className="down" span={24}>
            <Button shape="circle" icon="down"/>
          </Col>
        </Row>
        <Row className="testimonials">
          <Col sm={24} md={{span:20, offset:2}} lg={{span:16, offset:4}}>
            <Testimonial/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
