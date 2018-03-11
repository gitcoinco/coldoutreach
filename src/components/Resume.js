import React, { Component } from 'react';
import {  Button, Col, Icon, Row, Upload } from 'antd';

import Header from './Header';

import '../assets/styles/css/resume.css';


class Resume extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidate_file: null,
      recruiter_file: null,
    };
  }

  onSubmit() {
    console.log('onSubmit');
    console.log(this.state);

    let data = new FormData();

    data.append('candidate_file', this.state.candidate_file);
    data.append('recruiter_file', this.state.recruiter_file);

    this.props.uploadResume(data);
  }

  render() {
    const { resume } = this.props;

    const candidateProps = {
      beforeUpload: (file) => {
        console.log(file);
        this.setState({
          candidate_file: file
        });
        return false;
      },
      onRemove: (file) => {
        this.setState({ candidate_file: null });
      },
    };


    const recruiterProps = {
      beforeUpload: (file) => {
        console.log(file);
        this.setState({
          recruiter_file: file
        });
        return false;
      },
      onRemove: (file) => {
        this.setState({ recruiter_file: null });
      },
    };

    return (
      <div className="gradient">
        <Header/>
        <Row className="resume">
          <Col className="upload-box" offset={4} span={16}>
            <Col xs={24} md={12} lg={12}>
              <Col span={24}>
                <h4>Upload Your Resume</h4>
              </Col>
              <Col xs={24} md={24} lg={24}>
                <Upload
                  {...recruiterProps}
                  accept="application/pdf"
                >
                  {!this.state.recruiter_file && (
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )}
                </Upload>
              </Col>
            </Col>

            <Col xs={24} md={12} lg={12}>
              <Col span={24}>
                <h4>Upload Candidate Resume</h4>
              </Col>
              <Col xs={24} md={24} lg={24}>
                <Upload
                  {...candidateProps}
                  accept="application/pdf"
                >
                  {!this.state.candidate_file && (
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'} />
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  )}
                </Upload>
              </Col>
            </Col>

            <Col span={24} className="text-center">
              <Button onClick={this.onSubmit.bind(this)} loading={resume.loading}>
                {resume.loading ? 'Generating...' : 'Generate Email'}
              </Button>
            </Col>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Resume;
