import {FlexContainer} from '@components/index';
import {LoginHeader, LoginForm} from '@pages/Login/components/index';

export const Login = () => {
    return (
        <FlexContainer $justifyContent="center" $alignItems="center" $minHeight="100vh">
            <FlexContainer $flexDirection="column" $gap="2rem">
                <LoginHeader />
                <LoginForm />
            </FlexContainer>
        </FlexContainer>
    );
};
