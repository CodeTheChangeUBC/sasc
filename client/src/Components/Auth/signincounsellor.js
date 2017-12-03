import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderInput from './../RenderInput';
import PropTypes from 'prop-types';


class SigninCounsellor extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password);
        // TODO: Login
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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

SigninCounsellor.propTypes = {
    handleSubmit: PropTypes.func
};

export default reduxForm({
    form: 'signincounsellor'
})(SigninCounsellor);