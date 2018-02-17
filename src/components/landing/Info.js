import React, { Component } from 'react';
import { Row, Col } from 'antd';

import '../../assets/styles/css/info.css';

class Info extends Component {
  render() {
    const {image, alt, title, content} = this.props;

    return (
      <Row className="info">
        <Col span={24}>
          <Col span={4}><img src={image} alt={alt}/></Col>
          <Col span={16} offset={1}><h3>{title}</h3></Col>
        </Col>
        <Col span={16} offset={5}>
          <p>{content}</p>
        </Col>
      </Row>
    );
  }
}

export default Info;
