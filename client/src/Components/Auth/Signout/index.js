import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/authActions';
import PropTypes from 'prop-types';

class Signout extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }
    
    render() {
        return <div>Bye!</div>;
    }
}

Signout.propTypes = {
    signoutUser: PropTypes.func
};

export default connect(null, actions)(Signout);