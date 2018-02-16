import { connect } from 'react-redux';

import Email from '../components/Email';

const mapStateToProps = (state, ownProps) => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Email);
