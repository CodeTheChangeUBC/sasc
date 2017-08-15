import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ 
  age, 
  gender,
  onSubmit,
  onChange
}) => (
  <form onSubmit={onSubmit}>
    {age &&
        <label>Age:
          <input type="number" name="age" onChange={onChange}/>
        </label>
    }
    {gender &&
        <label>Gender:
        <select onChange={onChange} name="gender">
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
      <input type="text" name="phoneNumber" onChange={onChange}/>
    </label>
    <label>Password:
      <input type="password" name="password" required onChange={onChange}/>
    </label>
    <input type="submit" value="Submit" />
  </form>
);

export default Form;