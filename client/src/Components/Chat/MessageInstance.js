import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './../../Containers/Chat/styles.css';

class MessageInstance extends Component {
  render() {

    const fromMe = ((this.props.auth === "counsellor" && this.props.fromCounsellor) 
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
    auth: state.auth,
    user: state.user,
    counsellor: state.counsellor
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

MessageInstance.propTypes = {
    auth: PropTypes.string,
    fromCounsellor: PropTypes.number,
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