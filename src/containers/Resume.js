import { connect } from 'react-redux';

import Resume from '../components/Resume';

const mapStateToProps = (state, ownProps) => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
