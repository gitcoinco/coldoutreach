import { connect } from 'react-redux';

import Email from '../components/Email';

import * as ResumeActions from '../actions/index';


const mapStateToProps = (state, ownProps) => {
  return { ...state };
};


export default connect(mapStateToProps, {
  generateEmail: ResumeActions.GenerateEmail
})(Email);
