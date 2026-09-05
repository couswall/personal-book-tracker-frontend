import {FlexContainer, Paragraph, TitleH1} from '@components/index';
import {NOT_FOUND_MESSAGE, NOT_FOUND_TITLE} from '@pages/Book/components/book.components.constants';

export const NoBookFound = () => {
    return (
        <FlexContainer
            MinHeight="100vh"
            JustifyContent="center"
            AlignItems="center"
            FlexDirection="column"
            Gap="1rem"
        >
            <TitleH1 FontSize="4rem">{NOT_FOUND_TITLE}</TitleH1>
            <Paragraph FontSize="2rem">{NOT_FOUND_MESSAGE}</Paragraph>
        </FlexContainer>
    );
};
