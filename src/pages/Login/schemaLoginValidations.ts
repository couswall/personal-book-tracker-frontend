import * as yup from 'yup';
import { ERROR_MESSAGES } from '@pages/Login/constants';
import { regularExs } from '@constants/regExs';

export const schemaLoginValidations = yup.object().shape({
    emailOrUsername: yup.string()
        .required(ERROR_MESSAGES.REQUIRED)
        .trim()
        .min(3, ERROR_MESSAGES.EMAIL_USERNAME.MIN_LENGTH)
        .test(
            'not-only-blank-spaces', 
            ERROR_MESSAGES.EMAIL_USERNAME.BLANK_SPACES, 
            (value) => value?.trim().length !== 0, 
        ),
    password: yup.string()
        .required(ERROR_MESSAGES.REQUIRED)
        .trim()
        .matches(regularExs.password, ERROR_MESSAGES.PASSWORD.FORMAT),
});