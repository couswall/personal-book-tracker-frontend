import {Button, FlexContainer, FormContainer, Paragraph, TitleH2} from '@components/index';
import {ErrorAlert} from '@pages/SignUp/components/ErrorAlert';
import {FormField} from '@pages/SignUp/components/FormField';
import {useSignUpForm} from '@pages/SignUp/hooks/useSignUpForm';
import {publicRoutes} from '@routes/routes';
import {SIGN_UP, SIGNUP_FORM} from '@pages/SignUp/signUp.constants';
import {PASSWORD_VISIBILITY_LABELS} from '@constants/ariaLabels';

export const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        errorsMsg,
        loadings,
        navigate,
        showPassword,
        togglePasswordVisibility,
        onSubmit,
    } = useSignUpForm();

    return (
        <FlexContainer
            backgroundColorVariant="secondary"
            $justifyContent="center"
            $alignItems="center"
            $flexDirection="column"
            $padding="3.125rem 3.375rem"
            $boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            $borderRadius="1rem"
            $width="720px"
            $mdWidth="100%"
            $smallPadding="2.125rem 2.375rem"
        >
            <TitleH2
                $fontSize="2rem"
                $margin="0px 0px 0.5rem 0px"
                $textAlign="center"
                $lineHeight="1"
            >
                {SIGN_UP.TITLE}
            </TitleH2>
            <Paragraph size="sm" variant="muted" $textAlign="center">
                {SIGN_UP.DESCRIPTION}
            </Paragraph>

            {errorsMsg.registerUserErrorMsg && (
                <ErrorAlert errorMessage={errorsMsg.registerUserErrorMsg} />
            )}

            <FormContainer
                $flexDirection="column"
                $gap="1rem"
                $marginTop="2rem"
                $width="100%"
                onSubmit={handleSubmit(onSubmit)}
                $backgroundColor="inherit"
            >
                <FlexContainer
                    $flexDirection="column"
                    $gap="1.25rem"
                    $width="100%"
                    $backgroundColor="inherit"
                >
                    <FlexContainer $gap="1rem" $smallFlexDir="column" $backgroundColor="inherit">
                        <FormField
                            fieldName="fullName"
                            label={SIGNUP_FORM.FULL_NAME.LABEL}
                            placeholder={SIGNUP_FORM.FULL_NAME.PLACEHOLDER}
                            iconClass="fa-solid fa-user"
                            register={register}
                            errors={errors}
                            inputMaxLength={40}
                        />
                        <FormField
                            fieldName="username"
                            label={SIGNUP_FORM.USERNAME.LABEL}
                            placeholder={SIGNUP_FORM.USERNAME.PLACEHOLDER}
                            iconClass="fa-solid fa-circle-user"
                            register={register}
                            errors={errors}
                            inputMaxLength={30}
                        />
                    </FlexContainer>

                    <FlexContainer $gap="1rem" $smallFlexDir="column" $backgroundColor="inherit">
                        <FormField
                            fieldName="email"
                            label={SIGNUP_FORM.EMAIL.LABEL}
                            placeholder={SIGNUP_FORM.EMAIL.PLACEHOLDER}
                            iconClass="fa-solid fa-envelope"
                            register={register}
                            errors={errors}
                        />
                        <FormField
                            fieldName="password"
                            label={SIGNUP_FORM.PASSWORD.LABEL}
                            placeholder={SIGNUP_FORM.PASSWORD.PLACEHOLDER}
                            iconClass="fa-solid fa-lock"
                            inputType={showPassword ? 'text' : 'password'}
                            register={register}
                            errors={errors}
                            inputMaxLength={16}
                            endIcon={{
                                className: `fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`,
                                label: showPassword
                                    ? PASSWORD_VISIBILITY_LABELS.HIDE
                                    : PASSWORD_VISIBILITY_LABELS.SHOW,
                                onClick: togglePasswordVisibility,
                            }}
                        />
                    </FlexContainer>

                    <Button type="submit" loading={loadings.registerUserLoading} loadingText="">
                        {SIGN_UP.BTN_SUBMIT}
                    </Button>

                    <FlexContainer
                        $justifyContent="center"
                        $gap="0.5rem"
                        $marginTop="1.5rem"
                        $backgroundColor="inherit"
                    >
                        <Paragraph size="sm" variant="muted" $textAlign="center">
                            {SIGN_UP.HAVE_AN_ACCOUNT}
                        </Paragraph>
                        <Paragraph
                            size="sm"
                            variant="primary"
                            $fontWeight="600"
                            $cursor="pointer"
                            onClick={() => navigate(publicRoutes.login)}
                        >
                            {SIGN_UP.LOGIN_HERE}
                        </Paragraph>
                    </FlexContainer>
                </FlexContainer>
            </FormContainer>
        </FlexContainer>
    );
};
