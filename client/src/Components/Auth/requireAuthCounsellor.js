import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
    class AuthenticationForCounsellor extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            if (this.props.auth !== "counsellor") {
                this.context.router.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if (nextProps.auth !== "counsellor") {
                this.context.router.history.push('/');
            }
        }

        render() {
            return (<ComposedComponent { ...this.props
            }
            />);
        }
    }

    function mapStateToProps(state) {
        return {
            auth: state.auth.auth
        };
    }

    AuthenticationForCounsellor.propTypes = {
        auth: PropTypes.string
    };

    return connect(mapStateToProps)(AuthenticationForCounsellor);
}