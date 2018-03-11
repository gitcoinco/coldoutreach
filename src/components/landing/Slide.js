import React, { Component } from 'react';
import { Row, Col } from 'antd';

import '../../assets/styles/css/testimonial.css';


class Slide extends Component {

  render() {
    const {quote, img, org, alt, author, profession} = this.props;
    return(
      <Row>
        <Col sm={24} lg={{span:3, offset:0}} className="photo">
          { org &&
          <img id="org" alt="" src={org} />
          }
          <img alt={alt} src={img}/>
        </Col>
        <Col offset={2} span={20} lg={{span:20, offset:1}}>
          <Col span={24}>
            <p className="quote">{quote}</p>
          </Col>
          <Col span={24}>
            <Row><p className="author">{author}</p></Row>
            <Row>
              <p className="profession">{profession}</p>
            </Row>
          </Col>
        </Col>
      </Row>
    )
  }

}


export default Slide;
