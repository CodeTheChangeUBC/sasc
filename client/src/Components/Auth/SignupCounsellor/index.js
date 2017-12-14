import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ 
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  onSubmit,
  onChange
}) => (
  <form onSubmit={onSubmit}>
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
      email &&
      <label>
        Email:
        <input type="email" name="email" onChange={onChange} required />
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
    <input type="submit" value="Register and sign in as this counsellor" />
  </form>
);

Form.propTypes = {
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    email: PropTypes.bool,
    password: PropTypes.bool,
    passwordConfirm: PropTypes.bool,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};

export default Form;