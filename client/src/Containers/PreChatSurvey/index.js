import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Form from "./../../Components/Form";
import * as userActions from "../../Redux/Actions/userActions";
import * as roomActions from "../../Redux/Actions/roomActions";
import PropTypes from "prop-types";
import "./styles.css";

class PreChatSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: null,
            age: null,
            gender: null,
            email: null,
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
        const { nickname, age, gender, email } = fields;

        if (!nickname || !age || !gender || !email) {
            this.props.renderUserError("You must not leave any field blank.");
            return false;
        }

        // TODO: add regex check for email here.

        return true;
    }

    handleOnSubmit(ev) {
        ev.preventDefault();

        const { nickname, age, gender, email } = this.state;

        var fields = {
            nickname: nickname.trim(),
            age: age.trim(),
            gender: gender.trim(),
            email: email.trim()
        };

        var validated = this.validateForm(fields);

        if (validated) {
            const { history } = this.props;

            this.props.submitSurvey(fields, history);
        }
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return <div className="error">{this.props.errorMessage}</div>;
        }
    }

    render() {
        return (
            <div className="PreChatSurvey">
                <h2>Pre-chat Survey</h2>
                <p>Note: All fields required.</p>
                <Form
                    nickname
                    age
                    gender
                    email
                    button="Submit"
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
        errorMessage: state.user.status.error
    };
}

PreChatSurvey.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
    submitSurvey: PropTypes.func,
    errorMessage: PropTypes.string,
    removeError: PropTypes.func,
    renderUserError: PropTypes.func
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            submitSurvey: userActions.submitSurvey,
            renderUserError: userActions.renderUserError,
            removeError: userActions.removeError
        },
        dispatch
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreChatSurvey);
