import {FlexContainer} from '@components/index';
import {LoginHeader} from '@pages/Login/components/LoginHeader';
import {SignUpForm} from '@pages/SignUp/components/SignUpForm';

export const SignUp = () => {
    return (
        <FlexContainer JustifyContent="center" AlignItems="center" MinHeight="100vh">
            <FlexContainer FlexDirection="column" Gap="2rem">
                <LoginHeader />
                <SignUpForm />
            </FlexContainer>
        </FlexContainer>
    );
};
