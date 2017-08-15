import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ 
  age, 
  gender,
  selectValue,
  onSubmit,
  onChange
}) => (
  <form onSubmit={onSubmit}>
    {age &&
        <label>Age:
          <input type="number" name="age" />
        </label>
    }
    {gender &&
        <label>Gender:
        <select onChange={onChange} onvalue={selectValue}>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="non-binary">non-binary</option>
          <option value="transgender male">transgender male</option>
          <option value="transgender female">transgender female</option>
          <option value="other">other</option>
        </select>
        </label>
    }
    <label>Phone Number:
      <input type="text" name="phone number" />
    </label>
    <label>Password:
      <input type="password" name="password" />
    </label>
    <input type="submit" value="Submit" />
  </form>
);

export default Form;