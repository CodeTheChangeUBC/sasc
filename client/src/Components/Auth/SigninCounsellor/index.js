import React from 'react';
import PropTypes from 'prop-types';

const Form = ({
  email,
  password,
  onSubmit,
  onChange
}) => (
  <form onSubmit={onSubmit}>
    <label>Email:
      <input type="email" name="email" onChange={onChange}/>
    </label>
    <label>Password:
      <input type="password" name="password" required onChange={onChange}/>
    </label>
    <input type="submit" value="Submit" />
  </form>
);

Form.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};

export default Form;