import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../Redux/Actions/authActions';
import PropTypes from 'prop-types';

class Signout extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }
    
    render() {
        return (
            <div>Bye! Click <Link className="nav-link" to="/">here</Link> to go back to the homepage.</div>
        );
    }
}

Signout.propTypes = {
    signoutUser: PropTypes.func
};

export default connect(null, actions)(Signout);