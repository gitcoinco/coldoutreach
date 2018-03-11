import { connect } from 'react-redux';

import Email from '../components/Email';


const mapStateToProps = (state, ownProps) => {
  return { ...state };
};


export default connect(mapStateToProps, {})(Email);
