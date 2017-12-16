import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Form from './../../Components/Form';
import * as smsActions from '../../Redux/Actions/smsActions';
import * as authActions from '../../Redux/Actions/authActions';
import PropTypes from 'prop-types';
import './styles.css';

class Sms extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      email: null,
      twilioPhoneNumber: null,
      twilioAccountSid: null,
      twilioAuthToken: null
    };
     this.handleOnChange = this.handleOnChange.bind(this);
     this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentWillMount() {
    this.props.removeError();
  }

  handleOnChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleOnSubmit(ev) {
    ev.preventDefault();

    const { history } = this.props;

    this.props.setSMSDetails(this.state, history);
  }

  render() {
    return (
      <div className="Sms">
        <h2>SMS Settings</h2>
        <Form
          email
          twilioPhoneNumber
          twilioAccountSid
          twilioAuthToken
          onSubmit={this.handleOnSubmit}
          onChange={this.handleOnChange}
        />
      </div>
    );
  }
}

Sms.propTypes = {
    setSMSDetails: PropTypes.func,
    history: PropTypes.object,
    removeError: PropTypes.func
};

function mapStateToProps(state) {
    const { email, twilioPhoneNumber, twilioAccountSid, twilioAuthToken } = state;
    state.form = {
      email,
      twilioPhoneNumber,
      twilioAccountSid,
      twilioAuthToken
    };
    return {
      form: state.form
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setSMSDetails: smsActions.setSMSDetails, removeError: authActions.removeError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sms);