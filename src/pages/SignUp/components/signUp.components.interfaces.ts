import {FieldErrors, UseFormRegister} from 'react-hook-form';
import {ISignUpForm} from '@pages/SignUp/hooks/signUp.hooks.interfaces';

export type SignUpFieldName = 'fullName' | 'username' | 'email' | 'password';

export interface IFormFieldEndIcon {
    className: string;
    label: string;
    onClick: () => void;
}

export interface IFormFieldProps {
    label: string;
    placeholder?: string;
    inputType?: string;
    inputMaxLength?: number;
    iconClass: string;
    fieldName: SignUpFieldName;
    register: UseFormRegister<ISignUpForm>;
    errors: FieldErrors<ISignUpForm>;
    endIcon?: IFormFieldEndIcon;
}

export interface IErrorAlertProps {
    errorMessage: string;
}
