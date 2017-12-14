import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from './../../Components/Auth/SigninUser';
import * as actions from '../../Redux/Actions/authActions';
import PropTypes from 'prop-types';
import './styles.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: null,
      password: null,
      error: null
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

    this.props.signinUser(this.state, history);
  }

  renderAlert() {
    if (this.props.errorMessage) {
        return (
            <div className="alert alert-danger">
                {this.props.errorMessage}
            </div>
        );
    }
  }

  render() {
    return (
      <div className="Login">
        <h2>Login</h2>
        <Form
          onSubmit={this.handleOnSubmit}
          onChange={this.handleOnChange}
        />
        {this.renderAlert()}
        <div>
          <p>
            Are you a member of the SASC? Login <Link className="nav-link" to="/signincounsellor">here</Link> as a counsellor.
           </p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
    signinUser: PropTypes.func,
    history: PropTypes.object,
    errorMessage: PropTypes.string,
    removeError: PropTypes.func
};

function mapStateToProps(state) {
    const { username, password } = state;
    state.form = {
      username,
      password
    };
    return {
      form: state.form,
      errorMessage: state.auth.error
    };
}

export default connect(mapStateToProps, actions)(Login);