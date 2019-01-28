import React from 'react';
import './textField.css';

const validationError = ({ touched, error }) => {
    if (touched && error) {
        return (<span className="error">{error}</span>)
    }
}

const validationWarning = ({ touched, error, warning }) => {
    if (touched && !error && warning) {
        return (<span className="warning">{warning}</span>)
    }
}

const textField = ({ label, input, type, meta }) => {
    return (
        <label>
            {label}
            <input {...input} placeholder={label} type={type} />
            {validationError(meta)}
            {validationWarning(meta)}
        </label>
    );
}

export default textField;