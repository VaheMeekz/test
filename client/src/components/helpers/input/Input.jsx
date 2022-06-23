import React from 'react';
import TextField from "@mui/material/TextField";
import { ErrorMessage, useField } from 'formik';
const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <TextField
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off"
                label={label}
                fullWidth
                margin="normal"
            />
            <ErrorMessage component="div" name={field.name} className="error" />
        </div>
    );
};

export default Input;