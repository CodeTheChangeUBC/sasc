import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as authActions from '../../Redux/Actions/authActions';
import * as userActions from '../../Redux/Actions/userActions';
import PropTypes from 'prop-types';
import './styles.css';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.props.signoutUser(this.props.removeUser);
    }
    
    render() {
        return (
            <div className="Logout">
                Bye! Click <Link className="nav-link" to="/">here</Link> to go back to the homepage.
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signoutUser: authActions.signoutUser, removeUser: userActions.removeUser }, dispatch);
}

Logout.propTypes = {
    removeUser: PropTypes.func,
    signoutUser: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);