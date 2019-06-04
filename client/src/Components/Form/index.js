import React from "react";
import PropTypes from "prop-types";

const Form = ({
    username,
    nickname,
    firstName,
    lastName,
    age,
    gender,
    email,
    phoneNumber,
    password,
    passwordConfirm,
    oldPassword,
    newPassword,
    newPasswordConfirm,
    onSubmit,
    onChange,
    button,
    twilioEmail,
    twilioPhoneNumber,
    accountSid,
    authToken
}) => (
    <form onSubmit={onSubmit}>
        {username && (
            <div>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {nickname && (
            <div>
                <label>
                    Nickname:
                    <input
                        type="text"
                        name="nickname"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {firstName && (
            <div>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {lastName && (
            <div>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {age && (
            <div>
                <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {gender && (
            <div>
                <label>
                    Gender:
                    <select onChange={onChange} name="gender" required>
                        <option value="no-select">Please select</option>
                        <option value="cis-woman">Cis woman</option>
                        <option value="cis-man">Cis man</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="trans-woman">Trans woman</option>
                        <option value="trans-man">Trans man</option>
                        <option value="two-spirit">Two Spirit</option>
                        <option value="other">Other</option>
                    </select>
                </label>
            </div>
        )}
        {email && (
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {twilioEmail && (
            <div className="twilioEmail">
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {phoneNumber && (
            <div>
                <label>
                    Phone Number:
                    <input
                        type="number"
                        name="phoneNumber"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {password && (
            <div>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {passwordConfirm && (
            <div>
                <label>
                    Password Confirm:
                    <input
                        type="password"
                        name="passwordConfirm"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {oldPassword && (
            <div>
                <label>
                    Old Password:
                    <input
                        type="password"
                        name="oldPassword"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {newPassword && (
            <div>
                <label>
                    New Password:
                    <input
                        type="password"
                        name="newPassword"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {newPasswordConfirm && (
            <div>
                <label>
                    New Password Confirm:
                    <input
                        type="password"
                        name="newPasswordConfirm"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {twilioPhoneNumber && (
            <div className="twilioPhoneNumber">
                <label>
                    Twilio Phone Number:
                    <input
                        type="number"
                        name="twilioPhoneNumber"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {accountSid && (
            <div className="twilioAccountSid">
                <label>
                    Twilio Account SID:
                    <input
                        type="text"
                        name="accountSid"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        {authToken && (
            <div className="twilioAuthToken">
                <label>
                    Twilio Auth Token:
                    <input
                        type="text"
                        name="authToken"
                        onChange={onChange}
                        required
                    />
                </label>
            </div>
        )}
        <div>
            <input type="submit" value={button} />
        </div>
    </form>
);

Form.propTypes = {
    username: PropTypes.bool,
    nickname: PropTypes.bool,
    firstName: PropTypes.bool,
    lastName: PropTypes.bool,
    age: PropTypes.bool,
    gender: PropTypes.bool,
    email: PropTypes.bool,
    phoneNumber: PropTypes.bool,
    password: PropTypes.bool,
    passwordConfirm: PropTypes.bool,
    newPassword: PropTypes.bool,
    newPasswordConfirm: PropTypes.bool,
    oldPassword: PropTypes.bool,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    button: PropTypes.string,
    twilioEmail: PropTypes.bool,
    twilioPhoneNumber: PropTypes.bool,
    accountSid: PropTypes.bool,
    authToken: PropTypes.bool
};

export default Form;
