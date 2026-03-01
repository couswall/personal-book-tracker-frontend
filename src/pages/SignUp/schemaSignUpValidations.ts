import * as yup from 'yup';
import { ERROR_MESSAGES } from '@pages/SignUp/constants';
import { regularExs } from '@constants/regExs';

export const schemaSignUpValidations = yup.object().shape({
    fullName: yup.string()
        .required(ERROR_MESSAGES.REQUIRED_FIELD)
        .trim()
        .min(3, ERROR_MESSAGES.FULL_NAME.MIN_LENGTH)
        .max(40, ERROR_MESSAGES.FULL_NAME.MAX_LENGTH)
        .matches(regularExs.fullName, ERROR_MESSAGES.FULL_NAME.FORMAT)
        .test(
            'not-only-blank-spaces', 
            ERROR_MESSAGES.FULL_NAME.BLANK_SPACES, 
            (value) => value?.trim().length !== 0
        ),
    username: yup.string()
        .required(ERROR_MESSAGES.REQUIRED_FIELD)
        .trim()
        .min(3, ERROR_MESSAGES.USERNAME.MIN_LENGTH)
        .max(30, ERROR_MESSAGES.USERNAME.MAX_LENGTH)
        .matches(regularExs.username, ERROR_MESSAGES.USERNAME.FORMAT),
    email: yup.string()
        .required(ERROR_MESSAGES.REQUIRED_FIELD)
        .trim()
        .matches(regularExs.email, ERROR_MESSAGES.EMAIL.FORMAT),
    password: yup.string()
        .required(ERROR_MESSAGES.REQUIRED_FIELD)
        .trim()
        .min(6, ERROR_MESSAGES.PASSWORD.MIN_LENGTH)
        .max(16,ERROR_MESSAGES.PASSWORD.MAX_LENGTH)
        .matches(regularExs.password, ERROR_MESSAGES.PASSWORD.FORMAT),
});