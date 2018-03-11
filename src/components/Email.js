import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

import Header from './Header';
import Editor from "./Editor";

import { history } from '../store';

import '../assets/styles/css/email.css';


class Email extends Component {

  componentWillMount() {
    if (!this.props.resume.loading && !this.props.resume.generated_text) {
      history.push('/resume/');
    }
  }

  render() {
    return (
      <div className="gradient">
        <Header/>
        <Row className="email">
          <Col offset={4} span={16}>
            {/*<Col span={24} className="applicant-info">*/}
              {/*<p className="text">1 Email generated for:</p>*/}
              {/*<Col xs={24} md={14} lg={10} xl={6}>*/}
                {/*<h2>Amy Keys</h2>*/}
                {/*<p className="designation">Engineer - Etsy - New York, NY -</p>*/}
                {/*<p className="profile">http://www.linkedin.com/in/amykeys</p>*/}
              {/*</Col>*/}
              {/*<Col xs={24} md={10} lg={{offset:1, span: 13}} xl={{offset:1, span: 17}} className="recruit-img">*/}
                {/*<img alt="" src="https://avatars2.githubusercontent.com/u/5358146?s=400&u=61bb639da790daf097c0629587e0904223d2acaf&v=4"/>*/}
              {/*</Col>*/}
            {/*</Col>*/}
            <Col span={24}>
              <div className="editor">
                <Editor email={this.props.resume.generated_text}/>
                <Button>Randomize Message</Button>
                {/*<Button>Reset</Button>*/}
                <Button>Copy Draft</Button>
                {/*<Button>Save Draft</Button>*/}
                <Button className="generate">Send Email</Button>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Email;
