import * as yup from 'yup';
import {ERROR_MSG} from '@pages/Search/constants';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';

export const schemaSearchBook = yup.object().shape({
    searchText: yup
        .string()
        .required(GENERAL_ERROR_MSGS.MANDATORY)
        .trim()
        .min(2, ERROR_MSG.MIN_LENGTH)
        .max(50, ERROR_MSG.MAX_LENGTH)
        .test(
            'not-only-blank-spaces',
            GENERAL_ERROR_MSGS.MANDATORY,
            (value) => value?.trim().length !== 0
        ),
});
