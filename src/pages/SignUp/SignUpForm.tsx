import {
    Button,
    FlexContainer,
    FormContainer,
    LoadingSpinner,
    Paragraph,
    TitleH2,
} from '@components/index';
import {ErrorAlert} from '@pages/SignUp/ErrorAlert';
import {FormField} from '@pages/SignUp/FormField';
import {useSignUpForm} from '@pages/SignUp/useSignUpForm';
import {publicRoutes} from '@routes/routes';
import {SIGN_UP, SIGNUP_FORM} from '@pages/SignUp/constants';

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
            BackgroundColorVariant="secondary"
            JustifyContent="center"
            AlignItems="center"
            FlexDirection="column"
            Padding="3.125rem 3.375rem"
            BoxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            BorderRadius="1rem"
            Width="720px"
            MdWidth="100%"
            SmallPadding="2.125rem 2.375rem"
        >
            <TitleH2 FontSize="2rem" Margin="0px 0px 0.5rem 0px" TextAlign="center" LineHeight="1">
                {SIGN_UP.TITLE}
            </TitleH2>
            <Paragraph size="sm" variant="muted" TextAlign="center">
                {SIGN_UP.DESCRIPTION}
            </Paragraph>

            {errorsMsg.registerUserErrorMsg && (
                <ErrorAlert errorMessage={errorsMsg.registerUserErrorMsg} />
            )}

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
                    Gap="1.25rem"
                    Width="100%"
                    BackgroundColor="inherit"
                >
                    <FlexContainer Gap="1rem" SmallFlexDir="column" BackgroundColor="inherit">
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

                    <FlexContainer Gap="1rem" SmallFlexDir="column" BackgroundColor="inherit">
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
                                onClick: togglePasswordVisibility,
                            }}
                        />
                    </FlexContainer>

                    <Button type="submit" disabled={loadings.registerUserLoading}>
                        {loadings.registerUserLoading ? (
                            <FlexContainer
                                Width="100%"
                                BackgroundColor="transparent"
                                JustifyContent="center"
                            >
                                <LoadingSpinner Width="25px" Padding="5px" />
                            </FlexContainer>
                        ) : (
                            <>{SIGN_UP.BTN_SUBMIT}</>
                        )}
                    </Button>

                    <FlexContainer
                        JustifyContent="center"
                        Gap="0.5rem"
                        MarginTop="1.5rem"
                        BackgroundColor="inherit"
                    >
                        <Paragraph size="sm" variant="muted" TextAlign="center">
                            {SIGN_UP.HAVE_AN_ACCOUNT}
                        </Paragraph>
                        <Paragraph
                            size="sm"
                            variant="primary"
                            FontWeight="600"
                            Cursor="pointer"
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
