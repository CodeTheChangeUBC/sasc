import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderInput from './../RenderInput';
import PropTypes from 'prop-types';


class SignupCounsellor extends Component {
    handleFormSubmit({ firstName, lastName, email, password }) {
        console.log(firstName, lastName, email, password);
        // TODO: Register
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-group">
                    <label>First Name:</label>
                    <Field name="firstName" component={RenderInput} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <Field name="lastName" component={RenderInput} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <Field name="email" component={RenderInput} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <Field name="password" component={RenderInput} type="password" className="form-control" />
                </div>
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

SignupCounsellor.propTypes = {
    handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'signupcounsellor'
})(SignupCounsellor);