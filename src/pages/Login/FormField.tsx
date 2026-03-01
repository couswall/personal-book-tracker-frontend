import {UseFormRegisterReturn} from 'react-hook-form';
import {
    DarkGreyIcon,
    FlexContainer,
    Input,
    InputContainer,
    Label,
} from '@components/index';
import {ErrorMessage} from '@pages/Login/ErrorMessage';

interface FormFieldProps {
    label: string;
    placeholder: string;
    iconClass: string;
    type?: string;
    error?: string;
    register: UseFormRegisterReturn;
    endIcon?: {
        className: string;
        onClick: () => void;
    };
}

export const FormField = ({
    label,
    placeholder,
    iconClass,
    type = 'text',
    error,
    register,
    endIcon,
}: FormFieldProps) => {
    return (
        <FlexContainer
            Gap="0.5rem"
            FlexDirection="column"
            Width="100%"
            BackgroundColor="inherit"
        >
            <Label FontSize="0.875rem">{label}</Label>
            <InputContainer
                Gap="0.5rem"
                Padding="1rem 0px"
                AlignItems="center"
                Width="100%"
                hasError={!!error}
            >
                <DarkGreyIcon className={iconClass} FontSize="1rem" />
                <Input
                    BackgroundColor="transparent"
                    Border="none"
                    BorderRadius="0px"
                    FontSize="1rem"
                    placeholder={placeholder}
                    Width="100%"
                    type={type}
                    {...register}
                />
                {endIcon && (
                    <DarkGreyIcon
                        className={endIcon.className}
                        FontSize="1rem"
                        Cursor="pointer"
                        onClick={endIcon.onClick}
                    />
                )}
            </InputContainer>
            {error && <ErrorMessage message={error} />}
        </FlexContainer>
    );
};
