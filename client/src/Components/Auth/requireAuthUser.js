import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function(ComposedComponent) {
    class AuthenticationForUser extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            if (this.props.auth !== "user") {
                this.context.router.history.push("/login");
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.auth !== "user") {
                this.context.router.history.push("/login");
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth.auth
        };
    }

    AuthenticationForUser.propTypes = {
        auth: PropTypes.bool
    };

    return connect(mapStateToProps)(AuthenticationForUser);
}
