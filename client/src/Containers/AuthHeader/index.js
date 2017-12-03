import React, { Component } from 'react';

class AuthHeader extends Component {
    render() {
        return (
            <nav className="auth-header-nav">
                <ul className="auth-header">
                    <li className="auth-header-item">
                        Sign in
                    </li>
                </ul>
            </nav>
        );
    }
}

export default AuthHeader;