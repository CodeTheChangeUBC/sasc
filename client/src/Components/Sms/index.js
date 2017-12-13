import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RenderInput from './../RenderInput';
import * as actions from '../../Redux/Actions/smsActions';
import PropTypes from 'prop-types';

class Sms extends Component {
  handleFormSubmit({ email, twilioPhoneNumber, twilioAccountSid, twilioAuthToken }) {
        console.log(email, twilioPhoneNumber, twilioAccountSid, twilioAuthToken);
        // TODO: Need to push to database
        this.props.setSMSDetails({ email, twilioPhoneNumber, twilioAccountSid, twilioAuthToken });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="col-md-6">
      <h2>SMS To Email Settings</h2>
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group">
          <label className="control-label">Chat Contact Main Email:</label>
          <Field name="email" component={RenderInput} type="text" className="form-control" />
        </div>
        <div className="form-group">  
          <label className="control-label">Twilio Phone Number:</label>
          <Field name="twilioPhoneNumber" component={RenderInput} type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label className="control-label">Twilio Account SID:</label>
          <Field name="twilioAccountSid" component={RenderInput} type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label className="control-label">Twilio Auth Token:</label>
          <Field name="twilioAuthToken" component={RenderInput} type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      </div>
    );
  }

}

Sms.propTypes = {
    handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
    return { form: state.form };
}

var SmsForm = connect(mapStateToProps, actions)(Sms);

SmsForm = reduxForm({
 form: 'sms'
})(SmsForm);

export default SmsForm;