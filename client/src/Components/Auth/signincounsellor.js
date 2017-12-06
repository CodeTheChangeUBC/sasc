import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import RenderInput from './../RenderInput';
import * as actions from '../../Redux/Actions/authActions';
import PropTypes from 'prop-types';


class SigninCounsellor extends Component {
    handleFormSubmit({ email, password }) {
        console.log(email, password);
        // TODO: Login
        this.props.signinCounsellor({ email, password });
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
    handleSubmit: PropTypes.func,
    signinCounsellor: PropTypes.func
};

function mapStateToProps(state) {
    return { form: state.form };
}

SigninCounsellor = connect(mapStateToProps, actions)(SigninCounsellor);

SigninCounsellor = reduxForm({
 form: 'signincounsellor'
})(SigninCounsellor);

export default SigninCounsellor;