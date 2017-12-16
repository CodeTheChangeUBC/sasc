import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ 
  username,
  firstName,
  lastName,
  age, 
  gender,
  email,
  phoneNumber,
  password,
  passwordConfirm,
  onSubmit,
  onChange,
  twilioPhoneNumber,
  twilioAccountSid,
  twilioAuthToken
}) => (
  <form onSubmit={onSubmit}>
    {
      username &&
      <label>Username:
        <input type="text" name="username" onChange={onChange} required />
      </label>
    }
    {
      firstName &&
      <label>First Name:
        <input type="text" name="firstName" onChange={onChange} required />
      </label>
    }
    {
      lastName &&
      <label>Last Name:
        <input type="text" name="lastName" onChange={onChange} required />
      </label>
    }
    {
      age &&
        <label>Age:
          <input type="number" name="age" onChange={onChange} required />
        </label>
    }
    {
      gender &&
      <label>Gender:
        <select onChange={onChange} name="gender" required>
          <option value="no-select">Please select</option>
          <option value="cis-woman">Cis woman</option>
          <option value="cis-man">Cis man</option>
          <option value="non-binary">Non-binary</option>
          <option value="trans-woman">Trans woman</option>
          <option value="trans-man">Trans man</option>
          <option value="two-spirit">Two Spirit</option>
          <option value="other">Other</option>
        </select>
      </label>
    }
    {
      email &&
      <label>
        Email:
        <input type="email" name="email" onChange={onChange} required />
      </label>
    }
    {
      phoneNumber &&
      <label>
        Phone Number:
        <input type="number" name="phoneNumber" onChange={onChange} required />
      </label>
    }
    {
      password &&
      <label>
        Password:
        <input type="password" name="password" onChange={onChange} required />
      </label>
    }
    {
      passwordConfirm &&
      <label>
        Password Confirm:
        <input type="password" name="passwordConfirm" onChange={onChange} required />
      </label>
    }
    {
      twilioPhoneNumber &&
      <label>
        Twilio Phone Number:
        <input type="number" name="twilioPhoneNumber" onChange={onChange} required />
      </label>
    }
    {
      twilioAccountSid &&
      <label>
        Twilio Account SID:
        <input type="text" name="twilioAccountSid" onChange={onChange} required />
      </label>
    }
    {
      twilioAuthToken &&
      <label>
        Twilio Auth Token:
        <input type="text" name="twilioAuthToken" onChange={onChange} required />
      </label>
    }
    <input type="submit" value="Submit" />
  </form>
);

Form.propTypes = {
    username: PropTypes.bool,
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    age: PropTypes.bool,
    gender: PropTypes.bool,
    email: PropTypes.bool,
    phoneNumber: PropTypes.bool,
    password: PropTypes.bool,
    passwordConfirm: PropTypes.bool,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    twilioPhoneNumber: PropTypes.bool,
    twilioAccountSid: PropTypes.bool,
    twilioAuthToken: PropTypes.bool
};

export default Form;