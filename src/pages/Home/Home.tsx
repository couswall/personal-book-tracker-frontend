import {useState} from 'react';
import {
    BaseContainer,
    Container,
    FlexContainer,
    GridContainer,
    LoadingSpinner,
} from '@components/index';
import {
    CurrentlyReading,
    DashboardError,
    ReadingChallenge,
    StatsOverview,
    WantToRead,
} from '@pages/Home/components/index';
import {UpdateProgressModal} from '@pages/Book/components/UpdateProgressModal/UpdateProgressModal';
import {useDashboard} from '@pages/Home/hooks/useDashboard';
import {IShelfBook} from '@pages/Home/home.interfaces';

export const Home = () => {
    const {dashboard, status, token, refetch, retry} = useDashboard();
    const [progressBook, setProgressBook] = useState<IShelfBook | null>(null);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

    const openProgressModal = (book: IShelfBook) => {
        setProgressBook(book);
        setIsProgressModalOpen(true);
    };

    if (status === 'loading' || (status === 'success' && !dashboard)) {
        return (
            <FlexContainer $justifyContent="center" $alignItems="center" $minHeight="95vh">
                <LoadingSpinner aria-label="Loading dashboard" />
            </FlexContainer>
        );
    }

    if (status === 'error' || !dashboard) return <DashboardError onRetry={retry} />;

    return (
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
                    <StatsOverview shelves={dashboard.shelves} />
                    <CurrentlyReading
                        currentlyReading={dashboard.currentlyReading}
                        onUpdateProgress={openProgressModal}
                    />
                </FlexContainer>
                <BaseContainer
                    $gridColumn="span 4 / span 4"
                    $lgGridColumn="unset"
                    $backgroundColor="transparent"
                >
                    <ReadingChallenge challenge={dashboard.readingChallenge} />
                </BaseContainer>
            </GridContainer>
            <WantToRead books={dashboard.wantToRead.books} />
            {progressBook && (
                <UpdateProgressModal
                    isOpen={isProgressModalOpen}
                    onCloseModal={() => setIsProgressModalOpen(false)}
                    bookTitle={progressBook.title}
                    totalPages={progressBook.totalPages ?? 0}
                    bookshelfBookId={progressBook.bookshelfBookId}
                    currentPage={progressBook.currentPage}
                    readingProgress={progressBook.readingProgress}
                    progressType={progressBook.progressType}
                    token={token}
                    onRefresh={refetch}
                />
            )}
        </Container>
    );
};
