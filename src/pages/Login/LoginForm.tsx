import {
    Button,
    FlexContainer,
    FormContainer,
    LoadingSpinner,
    Paragraph,
    TitleH2,
} from '@components/index';
import {ErrorAlert} from '@pages/SignUp/ErrorAlert';
import {FormField} from '@pages/Login/FormField';
import {useLoginForm} from '@pages/Login/useLoginForm';
import {publicRoutes} from '@routes/routes';
import {LOGIN_PAGE} from '@pages/Login/constants';

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
            BackgroundColorVariant="secondary"
            JustifyContent="center"
            AlignItems="center"
            FlexDirection="column"
            Padding="3.125rem 3.375rem"
            BoxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            BorderRadius="1rem"
            Width="500px"
            SmallWidth="100%"
            SmallPadding="2.125rem 2.375rem"
        >
            <TitleH2 Margin="0px 0px 0.5rem 0px" TextAlign="center" LineHeight="1">
                {LOGIN_PAGE.TITLE}
            </TitleH2>
            <Paragraph size="sm" TextAlign="center" variant="muted">
                {LOGIN_PAGE.DESCRIPTION}
            </Paragraph>

            {errorsMsg.loginErrorMsg && <ErrorAlert errorMessage={errorsMsg.loginErrorMsg} />}

            <FormContainer
                FlexDirection="column"
                Gap="1rem"
                MarginTop="2rem"
                Width="100%"
                onSubmit={handleSubmit(onSubmit)}
                BackgroundColor="inherit"
            >
                <FlexContainer
                    FlexDirection="column"
                    Gap="1rem"
                    Width="100%"
                    BackgroundColor="inherit"
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
                            onClick: togglePasswordVisibility,
                        }}
                    />

                    <FlexContainer
                        JustifyContent="end"
                        MarginBottom="1rem"
                        BackgroundColor="inherit"
                    >
                        <Paragraph size="sm" Cursor="pointer" variant="primary" FontWeight="600">
                            {LOGIN_PAGE.FORGOT_PASSWORD}
                        </Paragraph>
                    </FlexContainer>

                    <Button type="submit" disabled={loadings.loginLoading}>
                        {loadings.loginLoading ? (
                            <FlexContainer
                                Width="100%"
                                BackgroundColor="transparent"
                                JustifyContent="center"
                            >
                                <LoadingSpinner
                                    Width="25px"
                                    Padding="5px"
                                    BackGroundColor="#FFFFFE"
                                />
                            </FlexContainer>
                        ) : (
                            <>{LOGIN_PAGE.BTN_LOGIN}</>
                        )}
                    </Button>

                    <FlexContainer
                        JustifyContent="center"
                        Gap="0.5rem"
                        MarginTop="1.5rem"
                        BackgroundColor="inherit"
                    >
                        <Paragraph size="sm" Cursor="pointer" TextAlign="center" variant="muted">
                            {LOGIN_PAGE.ACCOUNT_CTA}
                        </Paragraph>
                        <Paragraph
                            size="sm"
                            variant="primary"
                            FontWeight="600"
                            Cursor="pointer"
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
