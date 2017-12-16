import React, { Component } from 'react';
import MessageInstance from './../MessageInstance';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import './styles.css';

class MessageBox extends Component {
  render() {
    return(
      <div className="messageBox">
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

export default MessageBox;