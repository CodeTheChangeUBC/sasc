import React from 'react';
import uuid from 'uuid';

import CounsellorBarEntry from './CounsellorBarEntry';

/**
 * The sidebar of chat for counsellors
 *
 * TODO: finish and test
 */
class CounsellorBar extends React.Component {
    constructor(props) {
        super(props);

        const mockStudent1 = {name: "John Doe", phone: "(604) 111-1111", email: "John.Doe@yahoo.com" };
        const mockStudent2 = {name: "Jane Doe", phone: "(604) 111-1111", email: "Jane.Doe@yahoo.com" };
        const mockStudent3 = {name: "Tommy Chuk", phone: "(604) 777-7777", email: "tchuk@hotmail.com" };
        const mockStudent4 = {name: "Sabrina", phone: "(604) 777-7777", email: "sabrina@protonmain.ch" };
        const mockStudent5 = {name: "Bradly", phone: "(604) 777-7777", email: "bradly@protonmain.ch" };
        const mockStudents = [mockStudent1, mockStudent2, mockStudent3, mockStudent4, mockStudent5];
        const mockCounsellor = {ID: "1V5T3O",firstName: "Shilo", lastName: "St. Cyr",email: "admin@ams.ubc.ca"};

        /**
         * Currently using mock data to create
         *
         */
        this.state = {
            counsellor: mockCounsellor,
            students: mockStudents
        };

        this.renderCounsellorHeader = this.renderCounsellorHeader.bind(this)
    }

    /**
     * Display an entry for each student
     *
     * TODO: render the header for CounsellorBar
     */
    renderCounsellorHeader() {
        return (
            <div className="counsellor-bar-header">
                <h2 class="counsellor-bar-header-welcome">Hello {this.state.counsellor.firstName} {this.state.counsellor.lastName}! This is the counsellor bar.</h2>
            </div>
        );
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
                    {this.state.students.map((student) =>
                        <div key={uuid.v4()}>
                            <CounsellorBarEntry student={student} />
                        </div>)}
                </div>
            </div>
        );
    }
}

export default CounsellorBar;