import {FlexContainer, Paragraph, TitleH1} from '@components/index';
import {NOT_FOUND_MESSAGE, NOT_FOUND_TITLE} from '@pages/Book/components/book.components.constants';

export const NoBookFound = () => {
    return (
        <FlexContainer
            $minHeight="100vh"
            $justifyContent="center"
            $alignItems="center"
            $flexDirection="column"
            $gap="1rem"
        >
            <TitleH1 $fontSize="4rem">{NOT_FOUND_TITLE}</TitleH1>
            <Paragraph $fontSize="2rem">{NOT_FOUND_MESSAGE}</Paragraph>
        </FlexContainer>
    );
};
