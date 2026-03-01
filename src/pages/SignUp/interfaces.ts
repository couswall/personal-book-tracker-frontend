import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface ISignUpForm {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export type SignUpFildName = "fullName" | "username" | "email" | "password";

export interface IFormFieldProps {
  label: string;
  placeholder?: string;
  inputType?: string;
  inputMaxLength?: number;
  iconClass: string;
  fieldName: SignUpFildName;
  register: UseFormRegister<ISignUpForm>;
  errors: FieldErrors<ISignUpForm>;
  endIcon?: {
    className: string;
    onClick: () => void;
  };
}

export interface IErrorAlertProps{
  errorMessage: string;
}