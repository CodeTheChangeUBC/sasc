/*

Registers using payload:

ID int NOT NULL AUTO_INCREMENT,
    age int,
    gender VARCHAR(24),
    phoneNumber VARCHAR(15) NOT NULL ,
    password VARCHAR(30) NOT NULL,

for gender we have the following options (radio buttons): male, female, non-binary, transgender male, transgender female, other: _______

*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Form from "./../../Components/Form";
import * as authActions from "../../Redux/Actions/authActions";
import * as userActions from "../../Redux/Actions/userActions";
import PropTypes from "prop-types";
import "./styles.css";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            nickname: null,
            age: null,
            gender: null,
            phoneNumber: null,
            email: null,
            password: null,
            error: null
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
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

    validateForm(fields) {
        const { username, nickname, age, gender, email, phoneNumber } = fields;
        const { password, passwordConfirm } = this.state;

        if (password !== passwordConfirm) {
            this.props.renderAuthError("Passwords must match.");
            return false;
        }

        if (
            !username ||
            !nickname ||
            !age ||
            !gender ||
            !email ||
            !phoneNumber ||
            !password
        ) {
            this.props.renderAuthError("You must not leave any field blank.");
            return false;
        }

        // TODO: Add regex check for email here.

        this.props.removeError();

        if (this.props.user) {
            fields.ID = this.props.user.ID;
        } else {
            fields.ID = null;
        }

        return fields;
    }

    /**
     * once form is submitted, add the user to the database and switch to chat view
     *
     * TODO: if successful registration of user, update view layer
     * TODO: if unsuccessful, show flash message
     */
    handleOnSubmit(ev) {
        ev.preventDefault();
        const {
            username,
            nickname,
            age,
            gender,
            email,
            phoneNumber,
            password
        } = this.state;

        var fields = {
            username: username.trim(),
            nickname: nickname.trim(),
            age: age.trim(),
            gender: gender.trim(),
            email: email.trim(),
            phoneNumber: phoneNumber.trim(),
            password
        };

        var validated = this.validateForm(fields);

        if (validated) {
            const { history } = this.props;
            this.props.signupUser(validated, history, this.props.addUser);
        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return <div className="error">{this.props.errorMessage}</div>;
        }
    }

    render() {
        // TODO: style this form so it looks better

        return (
            <div className="Register">
                <h2>Register</h2>
                <Form
                    username
                    nickname
                    age
                    gender
                    email
                    phoneNumber
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
        user: state.user.user,
        errorMessage: state.auth.status.error
    };
}

Register.propTypes = {
    addUser: PropTypes.func,
    user: PropTypes.object,
    "user.ID": PropTypes.number,
    dispatch: PropTypes.func,
    history: PropTypes.object,
    signupUser: PropTypes.func,
    errorMessage: PropTypes.string,
    removeError: PropTypes.func,
    renderAuthError: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            signupUser: authActions.signupUser,
            addUser: userActions.addUser,
            removeError: authActions.removeError
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
