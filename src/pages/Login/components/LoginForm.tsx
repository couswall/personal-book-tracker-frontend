import {Button, FlexContainer, FormContainer, Paragraph, TitleH2} from '@components/index';
import {ErrorAlert} from '@pages/SignUp/components/ErrorAlert';
import {FormField} from '@pages/Login/components/FormField';
import {useLoginForm} from '@pages/Login/hooks/useLoginForm';
import {publicRoutes} from '@routes/routes';
import {LOGIN_PAGE} from '@pages/Login/login.constants';
import {PASSWORD_VISIBILITY_LABELS} from '@constants/ariaLabels';

export const LoginForm = () => {
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
    } = useLoginForm();

    return (
        <FlexContainer
            backgroundColorVariant="secondary"
            $justifyContent="center"
            $alignItems="center"
            $flexDirection="column"
            $padding="3.125rem 3.375rem"
            $boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            $borderRadius="1rem"
            $width="500px"
            $smallWidth="100%"
            $smallPadding="2.125rem 2.375rem"
        >
            <TitleH2 $margin="0px 0px 0.5rem 0px" $textAlign="center" $lineHeight="1">
                {LOGIN_PAGE.TITLE}
            </TitleH2>
            <Paragraph size="sm" $textAlign="center" variant="muted">
                {LOGIN_PAGE.DESCRIPTION}
            </Paragraph>

            {errorsMsg.loginErrorMsg && <ErrorAlert errorMessage={errorsMsg.loginErrorMsg} />}

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
                    $gap="1rem"
                    $width="100%"
                    $backgroundColor="inherit"
                >
                    <FormField
                        label={LOGIN_PAGE.FIELDS.EMAIL_USERNAME.LABEL}
                        placeholder={LOGIN_PAGE.FIELDS.EMAIL_USERNAME.PLACEHOLDER}
                        iconClass="fa-solid fa-user"
                        error={errors.emailOrUsername?.message}
                        register={register('emailOrUsername')}
                    />

                    <FormField
                        label={LOGIN_PAGE.FIELDS.PASSWORD.LABEL}
                        placeholder={LOGIN_PAGE.FIELDS.PASSWORD.PLACEHOLDER}
                        iconClass="fa-solid fa-lock"
                        type={showPassword ? 'text' : 'password'}
                        error={errors.password?.message}
                        register={register('password')}
                        endIcon={{
                            className: `fa-regular ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`,
                            label: showPassword
                                ? PASSWORD_VISIBILITY_LABELS.HIDE
                                : PASSWORD_VISIBILITY_LABELS.SHOW,
                            onClick: togglePasswordVisibility,
                        }}
                    />

                    <FlexContainer
                        $justifyContent="end"
                        $marginBottom="1rem"
                        $backgroundColor="inherit"
                    >
                        <Paragraph size="sm" $cursor="pointer" variant="primary" $fontWeight="600">
                            {LOGIN_PAGE.FORGOT_PASSWORD}
                        </Paragraph>
                    </FlexContainer>

                    <Button type="submit" loading={loadings.loginLoading} loadingText="">
                        {LOGIN_PAGE.BTN_LOGIN}
                    </Button>

                    <FlexContainer
                        $justifyContent="center"
                        $gap="0.5rem"
                        $marginTop="1.5rem"
                        $backgroundColor="inherit"
                    >
                        <Paragraph size="sm" $cursor="pointer" $textAlign="center" variant="muted">
                            {LOGIN_PAGE.ACCOUNT_CTA}
                        </Paragraph>
                        <Paragraph
                            size="sm"
                            variant="primary"
                            $fontWeight="600"
                            $cursor="pointer"
                            onClick={() => navigate(publicRoutes.signUp)}
                        >
                            {LOGIN_PAGE.SIGN_UP_HERE}
                        </Paragraph>
                    </FlexContainer>
                </FlexContainer>
            </FormContainer>
        </FlexContainer>
    );
};
