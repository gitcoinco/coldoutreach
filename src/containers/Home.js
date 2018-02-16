import { connect } from 'react-redux';

import Home from '../components/Home';

const mapStateToProps = (state, ownProps) => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
