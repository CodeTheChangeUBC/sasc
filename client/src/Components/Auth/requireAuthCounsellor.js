import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class AuthenticationForCounsellor extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      if (!this.props.authenticatedCounsellor) {
        this.context.router.history.push('/signincounsellor');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticatedCounsellor) {
        this.context.router.history.push('/signincounsellor');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticatedCounsellor: state.auth.authenticatedCounsellor };
  }

  AuthenticationForCounsellor.propTypes = {
    authenticatedCounsellor: PropTypes.bool
  };

  return connect(mapStateToProps)(AuthenticationForCounsellor);
}