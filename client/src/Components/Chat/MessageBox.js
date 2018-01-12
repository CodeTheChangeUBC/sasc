import React, { Component } from 'react';
import MessageInstance from './MessageInstance';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import './../../Containers/Chat/styles.css';

class MessageBox extends Component {
  componentDidUpdate() {
    const objDiv = document.getElementById('message-box');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    return(
      <div className="message-box" id="message-box">
        {this.props.msgs.map(({message,user}) => 
          <div key={uuid.v4()}>
            <MessageInstance
              user={user}
              message={message}
            />
          </div>
        )}
      </div>
    );
  }
}

MessageBox.propTypes = {
    msgs: PropTypes.array,
    "msgs.map": PropTypes.func
};

MessageBox.defaultProps = {
  msgs: []
};

export default MessageBox;