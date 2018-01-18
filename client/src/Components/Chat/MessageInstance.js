import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './../../Containers/Chat/styles.css';

class MessageInstance extends Component {
  render() {

    const fromMe = ((this.props.role === "counsellor" && this.props.fromCounsellor) 
      || (this.props.role !== "counsellor" && this.props.fromCounsellor === 0)) ? 'from-me' : '';

    return(
        <div className={`${fromMe} message-instance`}>
            <div className="message-user">
              {this.props.name}
            </div>
            <div className="message-body">
              {this.props.message}
            </div>
        </div>
      );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    role: state.auth.role,
    user: state.user.user,
    counsellor: state.counsellor.counsellor
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

MessageInstance.propTypes = {
    name: PropTypes.string,
    message: PropTypes.string,
    fromMe: PropTypes.bool
};

MessageInstance.defaultProps = {
  message: '',
  user: '',
  fromMe: false
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageInstance);