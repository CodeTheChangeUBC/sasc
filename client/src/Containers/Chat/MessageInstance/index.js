import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class MessageInstance extends Component {
  render() {
    const fromMe = this.props.fromMe ? 'from-me' : '';

    return(
        <div className={`messageInstance ${fromMe}`}>
            <div>
              {this.props.user}
            </div>
            <div>
              {this.props.message}
            </div>
        </div>
      );
  }
}

MessageInstance.propTypes = {
    user: PropTypes.string,
    message: PropTypes.string
};

MessageInstance.defaultProps = {
  message: '',
  user: '',
  fromMe: false
};

export default MessageInstance;