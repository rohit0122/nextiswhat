import * as yup from 'yup';

export const signInSchema = yup.object().shape({
    email: yup.string().required('Email is required.').email(),
    password: yup.string().required('Password is required.'),
});

export const signUpSchema = yup.object().shape({
    firstName: yup.string().required('First name is required.'),
    lastName: yup.string().required('Last name is required.'),
    email: yup.string().required('Email is required.').email(),
    password: yup.string().required('Password is required.'),
    confirmPassword: yup.string().required('Confirm Password is required.').oneOf([yup.ref('password'), null], 'Password must match.'),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});