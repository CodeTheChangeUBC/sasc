import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RenderInput from './../../RenderInput';
import * as actions from '../../../Redux/Actions/authActions';
import PropTypes from 'prop-types';


class SignupCounsellor extends Component {
    handleFormSubmit({ firstName, lastName, email, password, passwordConfirmation }) {
        const { history } = this.props;
        this.props.signupCounsellor({ firstName, lastName, email, password }, history);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    // TODO: Form validation
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
                <div className="form-group">
                    <label>Password Confirmation:</label>
                    <Field name="passwordConfirmation" component={RenderInput} type="password" className="form-control" />
                </div>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

SignupCounsellor.propTypes = {
    handleSubmit: PropTypes.func,
    signupCounsellor: PropTypes.func
};

function mapStateToProps(state) {
    return { form: state.form };
}

var SignupCounsellorForm = connect(mapStateToProps, actions)(SignupCounsellor);

SignupCounsellorForm = reduxForm({
 form: 'signupcounsellor'
})(SignupCounsellorForm);

export default SignupCounsellorForm;