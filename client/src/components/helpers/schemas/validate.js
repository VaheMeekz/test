import * as Yup from "yup";

export const signUpValidateSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .min(5, 'Must be 5-20 characters or less')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm password is required'),
});

export const signInValidateSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required')
});

export const workspaceValidateSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    domain: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
    subDomain: Yup.string()
        .min(5, 'Must be 5-15 characters or less')
        .max(15, 'Must be 5-15 characters or less')
        .required('Required'),
});


