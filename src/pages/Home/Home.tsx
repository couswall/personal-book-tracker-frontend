import {BaseContainer, Container, FlexContainer, GridContainer} from '@components/index';
import {
    CurrentlyReading,
    ReadingChallenge,
    StatsOverview,
    WantToRead,
} from '@pages/Home/components/index';
import {
    CURRENTLY_READING_BOOKS,
    HOME_STATS,
    READING_CHALLENGE,
    WANT_TO_READ_BOOKS,
} from '@pages/Home/home.constants';

export const Home = () => (
    <Container as="main" maxWidthVariant="xxl" $padding="3rem" $lgPadding="2rem 1rem">
        <GridContainer
            $marginBottom="2rem"
            $templateColumns="repeat(12, minmax(0, 1fr))"
            $gap="2rem"
            $lgTemplateColumns="1fr"
            $lgGap="2rem"
        >
            <FlexContainer
                $flexDirection="column"
                $gap="2rem"
                $gridColumn="span 8 / span 8"
                $lgGridColumn="unset"
            >
                <StatsOverview stats={HOME_STATS} />
                <CurrentlyReading books={CURRENTLY_READING_BOOKS} />
            </FlexContainer>
            <BaseContainer
                $gridColumn="span 4 / span 4"
                $lgGridColumn="unset"
                $backgroundColor="transparent"
            >
                <ReadingChallenge challenge={READING_CHALLENGE} />
            </BaseContainer>
        </GridContainer>
        <WantToRead books={WANT_TO_READ_BOOKS} />
    </Container>
);
