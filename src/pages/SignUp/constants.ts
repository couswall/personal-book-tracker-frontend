export const SIGN_UP = {
    TITLE: 'Create an account',
    DESCRIPTION: 'Sign up to continue',
    BTN_SUBMIT: 'Sign up',
    HAVE_AN_ACCOUNT: 'You already have an account?',
    LOGIN_HERE: 'Login here'
};

export const SIGNUP_FORM = {
    FULL_NAME: {
        LABEL: 'Full Name',
        PLACEHOLDER: 'Type your full name',
    },
    USERNAME: {
        LABEL: 'Username',
        PLACEHOLDER: 'Type your username',
    },
    EMAIL: {
        LABEL: 'Email',
        PLACEHOLDER: 'Type your email',
    },
    PASSWORD:{
        LABEL: 'Password',
        PLACEHOLDER: 'Type your password',
    }
};

export const ERROR_MESSAGES = {
    REQUIRED_FIELD: 'This field is required',
    FULL_NAME: {
        MIN_LENGTH: 'Full Name must be at least 3 characters long',
        MAX_LENGTH: 'Full Name must be at most 40 characters long',
        FORMAT: 'Full Name can only content letters of the alphabet and valid characters',
        BLANK_SPACES: 'Full Name cannot contain only blank spaces',
    },
    USERNAME: {
        MIN_LENGTH: 'Username must be at least 3 characters long',
        MAX_LENGTH: 'Username must be at most 30 characters long',
        FORMAT: 'Username can only include letters, numbers, dots and underscores',
    },
    EMAIL: {
        FORMAT: 'Invalid email'
    },
    PASSWORD: {
        MIN_LENGTH: 'Password must contain at least 6 characters',
        MAX_LENGTH: 'Password must contain at most 16 characters',
        FORMAT: 'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 special character',
    },
}