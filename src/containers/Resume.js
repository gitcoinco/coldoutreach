import { connect } from 'react-redux';

import Resume from '../components/Resume';

import * as ResumeActions from '../actions/index';


const mapStateToProps = (state, ownProps) => {
  return { ...state };
};


export default connect(mapStateToProps, {
  uploadResume: ResumeActions.UploadResume
})(Resume);
