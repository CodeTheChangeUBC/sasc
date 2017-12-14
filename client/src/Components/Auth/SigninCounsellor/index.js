import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RenderInput from './../../RenderInput';
import * as actions from '../../../Redux/Actions/authActions';
import PropTypes from 'prop-types';


class SigninCounsellor extends Component {
    handleFormSubmit({ email, password }) {
        const { history } = this.props;
        this.props.signinCounsellor({ email, password }, history);
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
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

SigninCounsellor.propTypes = {
    handleSubmit: PropTypes.func,
    signinCounsellor: PropTypes.func
};

function mapStateToProps(state) {
    return {
        form: state.form,
        errorMessage: state.auth.error
    };
}

var SigninCounsellorForm = connect(mapStateToProps, actions)(SigninCounsellor);

SigninCounsellorForm = reduxForm({
    form: 'signincounsellor'
})(SigninCounsellorForm);

export default SigninCounsellorForm;