import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Form from "./../../Components/Form";
import * as authActions from "../../Redux/Actions/authActions";
import * as counsellorActions from "../../Redux/Actions/counsellorActions";
import PropTypes from "prop-types";
import "./styles.css";

class RegisterCounsellor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentWillMount() {
        this.props.removeError();
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return <div className="error">{this.props.errorMessage}</div>;
        }
    }

    validateForm(fields) {
        const { firstName, lastName, email, password } = fields;
        const { passwordConfirm } = this.state;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !passwordConfirm
        ) {
            this.props.renderAuthError("You must not leave any field blank.");
            return false;
        }

        // TODO: add regex check for email here.

        if (password !== passwordConfirm) {
            this.props.renderAuthError("Passwords must match.");
        }

        this.props.removeError();

        return true;
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

        const { email, firstName, lastName, password } = this.state;

        var fields = {
            email: email.trim(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            password
        };

        var validated = this.validateForm(fields);

        if (validated) {
            const { history } = this.props;
            this.props.signupCounsellor(
                this.state,
                history,
                this.props.addCounsellor
            );
        }
    }

    // TODO: Form validation
    render() {
        return (
            <div className="RegisterCounsellor">
                <h2>Register Counsellor</h2>
                <Form
                    firstName
                    lastName
                    email
                    password
                    passwordConfirm
                    button="Register"
                    onSubmit={this.handleOnSubmit}
                    onChange={this.handleOnChange}
                />
                {this.renderAlert()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.status.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            signupCounsellor: authActions.signupCounsellor,
            addCounsellor: counsellorActions.addCounsellor,
            renderAuthError: authActions.renderAuthError,
            removeError: authActions.removeError
        },
        dispatch
    );
}

RegisterCounsellor.propTypes = {
    addUser: PropTypes.func,
    addCounsellor: PropTypes.func,
    dispatch: PropTypes.func,
    history: PropTypes.object,
    signupCounsellor: PropTypes.func,
    errorMessage: PropTypes.string,
    removeError: PropTypes.func,
    renderAuthError: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterCounsellor);
