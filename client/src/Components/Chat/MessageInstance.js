import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../../Containers/Chat/styles.css';

class MessageInstance extends Component {
  render() {

    const fromMe = this.props.fromMe ? 'from-me' : '';

    return(
        <div className={`${fromMe} message-instance`}>
            <div className="message-user">
              {this.props.user}
            </div>
            <div className="message-body">
              {this.props.message}
            </div>
        </div>
      );
  }
}

MessageInstance.propTypes = {
    user: PropTypes.string,
    message: PropTypes.string,
    fromMe: PropTypes.bool
};

MessageInstance.defaultProps = {
  message: '',
  user: '',
  fromMe: false
};

export default MessageInstance;