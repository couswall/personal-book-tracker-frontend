import {FlexContainer, Paragraph, TitleH1} from '@components/index';

export const NoBookFound = () => {
    return (
        <FlexContainer
            MinHeight="100vh"
            JustifyContent="center"
            AlignItems="center"
            FlexDirection="column"
            Gap="1rem"
        >
            <TitleH1 FontSize="4rem">{'404 error :('}</TitleH1>
            <Paragraph FontSize="2rem">{'Book does not exist'}</Paragraph>
        </FlexContainer>
    );
};
