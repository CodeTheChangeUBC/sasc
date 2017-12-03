import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderInput from './../RenderInput';
import PropTypes from 'prop-types';

class Sms extends Component {
  handleFormSubmit({ email, twilioPhoneNumber, twilioAccountSid, twilioAuthToken }) {
        console.log(email, twilioPhoneNumber, twilioAccountSid, twilioAuthToken);
        // TODO: Need to push to database
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

export default reduxForm({
    form: 'sms'
})(Sms);