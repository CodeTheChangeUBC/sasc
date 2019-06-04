import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import LaunchChat from "./../../Components/Button/LaunchChat";
import PropTypes from "prop-types";
import "./styles.css";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Home">
                <h2>Home</h2>
                <LaunchChat history={this.props.history} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

Home.propTypes = {
    history: PropTypes.object
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
