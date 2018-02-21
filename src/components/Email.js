import React, { Component } from 'react';
import Header from './Header';
import LzEditor from 'react-lz-editor';
import {Row, Col, Button } from 'antd';
import '../assets/styles/css/email.css';


class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: `<p>Good Morning Amy</p>
      <p>This is placeholder information that the tool would generate.
      Perhaps something like this…I saw your contribution to a StackOverflow 
      thread about sequencing Django South migrations in Django 1.4,
      you seem like you know your Django-fu.  Buzzfeed is a social software company in New York 
      (looks like you are just down the road) and I am building a Django team there.</p>
      <p>
        Pretend this is a sentence with customization language that can be very short. </br>
        Pretend this is a sentence with customization language that can be very long or very short. 
      </p> 
      <div>
        Add a custom note here: </br>
        Want to grab coffee sometime next week?  I have availability Tuesday and Thursday after 3 and like to meet at Ozo on Pearl st.
      </div>
      <div>
      <p>
        Sam </br>
        Engineering Manager, Buzzfeed</br>
        Job URL
      </p>
      `,
      responseList: []
    }
    this.receiveHtml=this.receiveHtml.bind(this);
  }

  receiveHtml(content) {
    this.setState({responseList:[]});
  }

  render() {
    return (<LzEditor
      active={true}
      lang="en"
      importContent={this.state.htmlContent}
      cbReceiver={this.receiveHtml}
      image={false}
      video={false}
      audio={false}/>);
  }
}

class Email extends Component {


  render() {
    return (
      <div className="gradient">
        <Header/>
        <Row className="email">
          <Col offset={4} span={16}>
            <Col span={24} className="applicant-info">
              <p className="text">1 Email generated for:</p>
              <Col xs={24} md={14} lg={10} xl={6}>
                <h2>Amy Keys</h2>
                <p className="designation">Engineer - Etsy - New York, NY -</p>
                <p className="profile">http://www.linkedin.com/in/amykeys</p>
              </Col>
              <Col xs={24} md={10} lg={{offset:1, span: 13}} xl={{offset:1, span: 17}} className="recruit-img">
                <img alt="" src="https://avatars2.githubusercontent.com/u/5358146?s=400&u=61bb639da790daf097c0629587e0904223d2acaf&v=4"/>
              </Col>
            </Col>
            <Col span={24}>
              <div className="editor">
                <Editor/>
                <Button>Randomize Message</Button>
                <Button>Reset</Button>
                <Button>Copy Draft</Button>
                <Button>Save Draft</Button>
                <Button className="generate">Generate Email</Button>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Email;
