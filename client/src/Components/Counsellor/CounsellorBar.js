import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import CounsellorBarEntry from './CounsellorBarEntry';

/**
 * The sidebar of chat for counsellors
 *
 * TODO: finish and test
 */
class CounsellorBar extends React.Component {
    constructor(props) {
        super(props);

        /**
         * Currently using mock data to create
         *
         */
        this.state = {
            counsellor: null,
            students: null
        };

        this.renderCounsellorHeader = this.renderCounsellorHeader.bind(this);
    }

    /**
     * Display an entry for each student
     *
     * TODO: render the header for CounsellorBar
     */
    renderCounsellorHeader() {
        return (
            <div className="counsellor-bar-header">
                <h4 className="counsellor-bar-header-welcome">Hello {this.props.counsellor.firstName} {this.props.counsellor.lastName}! This is the counsellor bar.</h4>
            </div>
        );
    }

    renderStudentEntries() {
        if (this.props.rooms.length > 0) {
            return (
                <div>
                    {this.props.rooms.map((room) =>
                            <div key={uuid.v4()}>
                                <CounsellorBarEntry room={room} />
                            </div>)}
                </div>
            );
        } else {
            return (
                <div>
                    <div className="counsellor-bar-entry"><p>You have no students.</p>
                    </div>
                </div>
            );
        }
    }

    /**
     * Display the CounsellorBar
     * @variable student is an object that contains... TODO
     *
     * TODO: render the CounsellorBar
     */
    render() {
        return (
            <div className="counsellor-bar-shell">
                {this.renderCounsellorHeader()}
                <div className="counsellor-bar-entries">
                    {this.renderStudentEntries()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
  return {
    counsellor: state.counsellor,
    rooms: state.rooms
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

CounsellorBar.propTypes = {
    counsellor: PropTypes.object,
    rooms: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(CounsellorBar);
