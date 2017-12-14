import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Redux/Actions/authActions';

class Signout extends Component {
    componentWillMount() {
        this.props.signoutUser();
    }
    
    render() {
        return <div>Bye!</div>;
    }
}

export default connect(null, actions)(Signout);