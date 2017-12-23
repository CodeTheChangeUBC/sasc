import React from 'react';

/**
 * Entry that show a student inside counsellor bar
 *
 * TODO: I want to redirect the chat to student's context when I click on an entry
 */
const CounsellorBarEntry = ({
    student
}) => (
    <div className="counsellor-bar-entry">
        <h2>{student.name}</h2>
        <p>{student.phone}</p>
    </div>
);

export default CounsellorBarEntry;