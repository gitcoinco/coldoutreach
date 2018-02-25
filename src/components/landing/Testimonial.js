import React, { Component } from 'react';
import { Row, Col, Carousel } from 'antd';
import '../../assets/styles/css/testimonial.css';
import slack from '../../assets/img/slack.svg';

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

class Testimonial extends Component {

  render() {
    return (
      <div class="testimonials">
        <Carousel autoplay>
          <div>
            <Slide
              quote="“Just started using coldoutreach.io. Great way to match
              our needs with the talent we’re looking for. A perfect
              tool for recruiting and hiring”"
              img="https://avatars2.githubusercontent.com/u/5358146?s=400&u=61bb639da790daf097c0629587e0904223d2acaf&v=4"
              alt="@thelostone"
              author="Aditya Anand"
              org={slack}
              profession="Photographer, works with Slack team"
            />
          </div>
          <div>
            <Slide
              quote="“Just started using coldoutreach.io. Great way to match
              our needs with the talent we’re looking for. A perfect
              tool for recruiting and hiring”"
              img="https://avatars2.githubusercontent.com/u/5358146?s=400&u=61bb639da790daf097c0629587e0904223d2acaf&v=4"
              alt="@thelostone"
              author="Aditya Anand"
              profession="Photographer, works with Slack team"
            />
          </div>
          <div>
            <Slide
              quote="“Just started using coldoutreach.io. Great way to match
              our needs with the talent we’re looking for. A perfect
              tool for recruiting and hiring”"
              img="https://avatars2.githubusercontent.com/u/5358146?s=400&u=61bb639da790daf097c0629587e0904223d2acaf&v=4"
              alt="@thelostone"
              author="Aditya Anand"
              profession="Photographer, works with Slack team"
            />
          </div>
          <div>
            <Slide
              quote="“Just started using coldoutreach.io. Great way to match
              our needs with the talent we’re looking for. A perfect
              tool for recruiting and hiring”"
              img="https://avatars2.githubusercontent.com/u/5358146?s=400&u=61bb639da790daf097c0629587e0904223d2acaf&v=4"
              alt="@thelostone"
              author="Aditya Anand"
              profession="Photographer, works with Slack team"
            />
          </div>
        </Carousel>
      </div>
    );
  }

}

export default Testimonial;
