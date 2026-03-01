import {FlexContainer, LogoIcon, TitleH1} from '@components/index';
import {LOGIN_PAGE} from '@pages/Login/constants';

export const LoginHeader = () => {
    return (
        <FlexContainer
            FlexDirection="column"
            Gap="0.5rem"
            JustifyContent="center"
            AlignItems="center"
        >
            <LogoIcon size="50px" />
            <TitleH1>{LOGIN_PAGE.BOOK_TRACKER}</TitleH1>
        </FlexContainer>
    );
};
