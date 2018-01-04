import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../../Containers/Chat/styles.css';

class MessageInstance extends Component {
  render() {

    return(
        <div className="messageInstance">
            <div className="messageUser">
              {this.props.user}
            </div>
            <div className="messageBody">
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