import {Icon, FlexContainer, Input, InputContainer, Label} from '@components/index';
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
        <FlexContainer
            $gap="0.5rem"
            $flexDirection="column"
            $width="100%"
            $backgroundColor="inherit"
        >
            <Label $fontSize="0.875rem">{label}</Label>
            <InputContainer
                $gap="0.5rem"
                $padding="1rem 0px"
                $alignItems="center"
                $width="100%"
                hasError={!!error}
            >
                <Icon variant="dark" className={iconClass} $fontSize="1rem" />
                <Input
                    $backgroundColor="transparent"
                    $border="none"
                    $borderRadius="0px"
                    $fontSize="1rem"
                    placeholder={placeholder}
                    $width="100%"
                    type={type}
                    {...register}
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
            {error && <ErrorMessage message={error} />}
        </FlexContainer>
    );
};
