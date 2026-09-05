import {FlexContainer} from '@components/index';
import {LoginHeader, LoginForm} from '@pages/Login/components/index';

export const Login = () => {
    return (
        <FlexContainer JustifyContent="center" AlignItems="center" MinHeight="100vh">
            <FlexContainer FlexDirection="column" Gap="2rem">
                <LoginHeader />
                <LoginForm />
            </FlexContainer>
        </FlexContainer>
    );
};
