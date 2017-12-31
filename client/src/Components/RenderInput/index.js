import React from 'react';

const renderInput = field =>
    <div>
        <input {...field.input} type={field.type} className="form-control" />
    </div>;

export default renderInput;