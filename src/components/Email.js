import React, { Component } from 'react';
import { Button, Col, Row, message } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Header from './Header';
import Editor from "./Editor";

import { history } from '../store';

import '../assets/styles/css/email.css';


class Email extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: ''
    }
  }

  componentWillMount() {
    if (!this.props.resume.loading && !this.props.resume.generated_text) {
      history.push('/resume');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resume.generated_text !== this.props.resume.generated_text) {
      this.setState({ email: nextProps.resume.generated_text });
      message.success('Successfully generated the email');
    }
  }

  onEditEmail = (email) => {
    this.setState({ copied: false, email: email.replace(/<[^>]+>/g, '') });
  }

  generateEmail = () => {
    this.props.generateEmail({
      candidate_json: JSON.stringify(this.props.resume.candidate_json),
      recruiter_json: JSON.stringify(this.props.resume.recruiter_json),
    });
  }

  onClickCopy = () => {
    this.setState({ copied: true });
    message.success('Successfully copied the email');
  }

  render() {
    const { candidate_json } = this.props.resume;

    return (
      <div className="gradient">
        <Header/>
        <Row className="email">
          <Col offset={4} span={16}>
            <Col span={24} className="applicant-info">
              <p className="text">1 Email generated for:</p>
              <Col xs={24} md={14} lg={10} xl={6}>
                <h2>{candidate_json.name}</h2>
                <p className="designation">{candidate_json.email}</p>
                {/*<p className="profile">http://www.linkedin.com/in/amykeys</p>*/}
              </Col>
              {/*<Col xs={24} md={10} lg={{offset:1, span: 13}} xl={{offset:1, span: 17}} className="recruit-img">*/}
                {/*<img alt="" src="https://avatars2.githubusercontent.com/u/5358146?s=400&u=61bb639da790daf097c0629587e0904223d2acaf&v=4"/>*/}
              {/*</Col>*/}
            </Col>
            <Col span={24}>
              <div className="editor">
                <Editor email={this.props.resume.generated_text} onEdit={this.onEditEmail}/>
                <Button onClick={this.generateEmail.bind(this)}>Randomize Message</Button>
                {/*<Button>Reset</Button>*/}

                <CopyToClipboard text={this.state.email} onCopy={this.onClickCopy.bind(this)}>
                  <Button>Copy Draft</Button>
                </CopyToClipboard>

                {/*<Button>Save Draft</Button>*/}
                <Button className="generate">
                  <a href={`mailto:${candidate_json.email}?body=${encodeURIComponent(this.state.email)}`} target="_blank">
                    Send Email
                  </a>
                </Button>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}


export default Email;
