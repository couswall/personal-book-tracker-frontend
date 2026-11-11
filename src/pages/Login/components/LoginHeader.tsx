import {FlexContainer, LogoIcon, TitleH1} from '@components/index';
import {LOGIN_PAGE} from '@pages/Login/login.constants';

export const LoginHeader = () => {
    return (
        <FlexContainer
            $flexDirection="column"
            $gap="0.5rem"
            $justifyContent="center"
            $alignItems="center"
        >
            <LogoIcon size="50px" />
            <TitleH1>{LOGIN_PAGE.BOOK_TRACKER}</TitleH1>
        </FlexContainer>
    );
};
