import {DarkGreyIcon, FlexContainer, Input, InputContainer, Label} from '@components/index';
import {ErrorMessage} from '@pages/Login/components/ErrorMessage';
import {IFormFieldProps} from '@pages/Login/components/login.components.interfaces';

export const FormField = ({
    label,
    placeholder,
    iconClass,
    type = 'text',
    error,
    register,
    endIcon,
}: IFormFieldProps) => {
    return (
        <FlexContainer Gap="0.5rem" FlexDirection="column" Width="100%" BackgroundColor="inherit">
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
                        aria-label={endIcon.label}
                    />
                )}
            </InputContainer>
            {error && <ErrorMessage message={error} />}
        </FlexContainer>
    );
};
