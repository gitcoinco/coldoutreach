import React, { Component } from 'react';
import LzEditor from 'react-lz-editor';

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
    };

    this.receiveHtml = this.receiveHtml.bind(this);
  }

  receiveHtml(content) {
    this.setState({responseList:[]});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.email !== this.props.email) {
      console.log(nextProps.email);
      this.setState({ htmlContent: nextProps.email });
    }
  }

  render() {
    return (
      <LzEditor
        active={true}
        lang="en"
        importContent={this.state.htmlContent}
        cbReceiver={this.receiveHtml}
        image={false}
        video={false}
        audio={false}
      />
    );
  }
}


export default Editor;
