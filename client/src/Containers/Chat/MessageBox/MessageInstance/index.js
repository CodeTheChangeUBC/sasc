import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class MessageInstance extends Component {
  render() {
    return(
        <div className="messageInstance">
          {this.props.user} {this.props.message}
        </div>
      );
  }
}

MessageInstance.propTypes = {
    user: PropTypes.string,
    message: PropTypes.string
};

export default MessageInstance;