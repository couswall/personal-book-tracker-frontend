import {UseFormRegisterReturn} from 'react-hook-form';

export interface IErrorMessageProps {
    message?: string;
}

export interface IFormFieldEndIcon {
    className: string;
    label: string;
    onClick: () => void;
}

export interface IFormFieldProps {
    label: string;
    placeholder: string;
    iconClass: string;
    type?: string;
    error?: string;
    register: UseFormRegisterReturn;
    endIcon?: IFormFieldEndIcon;
}
