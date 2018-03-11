import React, { Component } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import Header from './Header';
import Card from './landing/Card';
import Info from './landing/Info';
import Testimonial from './landing/Testimonial';

import '../assets/styles/css/home.css';
import candidate from '../assets/img/candidate.svg';
import generate from '../assets/img/generate.svg';
import email from '../assets/img/email.svg';
import recruit_1 from '../assets/img/recruit_1.svg';
import recruit_2 from '../assets/img/recruit_2.svg';
import recruit_3 from '../assets/img/recruit_3.svg';
import decor from '../assets/img/decor.svg';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="gradient">
          <Header/>
          <Row className="landing-header">
            <Col className="left" offset={2} md={20} lg={5}>
              <h1 className="title">A Better Way to Find Talent</h1>
              <p className="content">
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
                  <Card title="FIND CANDIDATE" image={candidate}/>
                </Col>
                <Col offset={4} xs={16} sm={{span:8, offset:0}}>
                  <Card title="GENERATE EMAIL" image={generate}/>
                </Col>
                <Col offset={4} xs={16} sm={{span:8, offset:0}}>
                  <Card title="REACH OUT" image={email}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row className="idea">
          <Col offset={1} span={22}>
            <h2>Recruit the Smart Way</h2>
          </Col>
          <Col offset={1} sm={22} md={6}>
            <Info title="Lorem ipsum dolor sit amet"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam" image={recruit_1} id="recruit_1"/>
          </Col>
          <Col offset={1} sm={22} md={{span:6, offset:1}}>
            <Info title="Lorem ipsum dolor sit"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam" image={recruit_2} id="recruit_2"/>
          </Col>
          <Col offset={1} sm={22} md={{span:6, offset:1}}>
            <Info title="Lorem ipsum dolor sit"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam" image={recruit_3} id="recruit_3"/>
          </Col>
          <img className="left-decor" alt="" src={decor}/>
        </Row>
        <Row>
          <Col className="down" span={24}>
            <Button shape="circle" icon="down"/>
          </Col>
        </Row>
        <Row className="testimonials">
          <img className="right-decor" alt="" src={decor}/>
          <Col sm={24} md={{span:20, offset:2}} lg={{span:16, offset:4}}>
            <Testimonial/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
