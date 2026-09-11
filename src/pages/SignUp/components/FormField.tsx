import {Icon, FlexContainer, Input, InputContainer, Label} from '@components/index';
import {ErrorMessage} from '@pages/Login/components/ErrorMessage';
import {IFormFieldProps} from '@pages/SignUp/components/signUp.components.interfaces';

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
        <FlexContainer
            $gap="0.5rem"
            $flexDirection="column"
            $width="100%"
            $backgroundColor="inherit"
        >
            <Label FontSize="0.875rem">{label}</Label>
            <InputContainer
                $gap="0.5rem"
                $padding="1rem 0px"
                $alignItems="center"
                $width="100%"
                hasError={!!errors[fieldName]}
            >
                <Icon variant="dark" className={iconClass} $fontSize="1rem" />
                <Input
                    $border="none"
                    $borderRadius="0px"
                    $fontSize="1rem"
                    placeholder={placeholder}
                    $width="100%"
                    $backgroundColor="transparent"
                    type={inputType}
                    {...register(fieldName)}
                    maxLength={inputMaxLength}
                />
                {endIcon && (
                    <Icon
                        variant="dark"
                        className={endIcon.className}
                        $fontSize="1rem"
                        $cursor="pointer"
                        onClick={endIcon.onClick}
                        aria-label={endIcon.label}
                    />
                )}
            </InputContainer>
            {errors[fieldName]?.message && <ErrorMessage message={errors[fieldName].message} />}
        </FlexContainer>
    );
};
