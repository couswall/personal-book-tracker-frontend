import {FlexContainer} from '@components/index';
import {LoginHeader} from '@pages/Login/LoginHeader';
import {LoginForm} from '@pages/Login/LoginForm';

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
