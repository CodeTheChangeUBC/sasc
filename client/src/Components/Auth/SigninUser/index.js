import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ 
  username,
  age, 
  gender,
  email,
  phoneNumber,
  password,
  passwordConfirm,
  onSubmit,
  onChange
}) => (
  <form onSubmit={onSubmit}>
    {
      username &&
      <label>Username:
        <input type="text" name="username" onChange={onChange}/>
      </label>
    }
    {
      age &&
        <label>Age:
          <input type="number" name="age" onChange={onChange}/>
        </label>
    }
    {
      gender &&
      <label>Gender:
        <select onChange={onChange} name="gender">
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
        <input type="text" name="email" onChange={onChange}/>
      </label>
    }
    {
      phoneNumber &&
      <label>
        Phone Number:
        <input type="number" name="phoneNumber" onChange={onChange}/>
      </label>
    }
    {
      password &&
      <label>
        Password:
        <input type="password" name="password" onChange={onChange}/>
      </label>
    }
    {
      passwordConfirm &&
      <label>
        Password Confirm:
        <input type="password" name="passwordConfirm" onChange={onChange}/>
      </label>
    }
    <label>Username:
      <input type="text" name="username" onChange={onChange}/>
    </label>
    <label>Password:
      <input type="password" name="password" required onChange={onChange}/>
    </label>
    <input type="submit" value="Submit" />
  </form>
);

Form.propTypes = {
    username: PropTypes.bool,
    age: PropTypes.bool,
    gender: PropTypes.bool,
    email: PropTypes.string,
    phoneNumber: PropTypes.number,
    password: PropTypes.string,
    passwordConfirm: PropTypes.string,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
};

export default Form;