import {DarkGreyIcon, FlexContainer, Input, InputContainer, Label} from '@components/index';
import {ErrorMessage} from '@pages/Login/ErrorMessage';
import {IFormFieldProps} from '@pages/SignUp/interfaces';

export const FormField: React.FC<IFormFieldProps> = ({
    label,
    placeholder = '',
    fieldName,
    inputType = 'text',
    inputMaxLength = 50,
    iconClass = '',
    errors,
    register,
    endIcon,
}) => {
    return (
        <FlexContainer Gap="0.5rem" FlexDirection="column" Width="100%" BackgroundColor="inherit">
            <Label FontSize="0.875rem">{label}</Label>
            <InputContainer
                Gap="0.5rem"
                Padding="1rem 0px"
                AlignItems="center"
                Width="100%"
                hasError={!!errors[fieldName]}
            >
                <DarkGreyIcon className={iconClass} FontSize="1rem" />
                <Input
                    Border="none"
                    BorderRadius="0px"
                    FontSize="1rem"
                    placeholder={placeholder}
                    Width="100%"
                    BackgroundColor="transparent"
                    type={inputType}
                    {...register(fieldName)}
                    maxLength={inputMaxLength}
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
            {errors[fieldName]?.message && <ErrorMessage message={errors[fieldName].message} />}
        </FlexContainer>
    );
};
