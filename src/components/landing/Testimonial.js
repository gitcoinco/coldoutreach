import React, { Component } from 'react';
import { Carousel } from 'antd';

import Slide from './Slide';

import '../../assets/styles/css/testimonial.css';

import slack from '../../assets/img/slack.svg';


class Testimonial extends Component {

  render() {
    return (
      <div className="testimonials">
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
