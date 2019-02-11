import React from 'react';
import './textField.css';
import { WrappedFieldMetaProps } from 'redux-form';

const validationError: React.FC<WrappedFieldMetaProps> = ({ touched, error }) => {
    return (touched && error) ? (<span className='error'>{error}</span>) : null;
};

const validationWarning: React.FC<WrappedFieldMetaProps> = ({ touched, error, warning }) => {
    return (touched && !error && warning) ? (<span className='warning'>{warning}</span>) : null;
};

const textField = ({ label, input, type, meta }: any) => {
    return (
        <label>
            {label}
            <input {...input} placeholder={label} type={type} />
            {validationError(meta)}
            {validationWarning(meta)}
        </label>
    );
};

export default textField;
