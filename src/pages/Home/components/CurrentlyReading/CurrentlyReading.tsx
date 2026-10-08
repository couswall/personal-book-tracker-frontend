import {useNavigate} from 'react-router';
import {BaseContainer, FlexContainer, GridContainer, Icon, Text, TitleH4} from '@components/index';
import {EmptyState} from '@pages/Home/components/EmptyState/EmptyState';
import {CurrentlyReadingCard} from '@pages/Home/components/CurrentlyReading/CurrentlyReadingCard';
import {IDashboard, IShelfBook} from '@pages/Home/home.interfaces';
import {HOME_TEXTS} from '@pages/Home/home.constants';
import {privateRoutes} from '@routes/routes';

interface ICurrentlyReadingProps {
    currentlyReading: IDashboard['currentlyReading'];
    onUpdateProgress: (book: IShelfBook) => void;
}

export const CurrentlyReading: React.FC<ICurrentlyReadingProps> = ({
    currentlyReading: {total, books},
    onUpdateProgress,
}) => {
    const navigate = useNavigate();
    const hiddenCount = total - books.length;

    return (
        <BaseContainer as="section">
            <FlexContainer
                $alignItems="center"
                $gap="0.5rem"
                $marginBottom="1.5rem"
                $backgroundColor="transparent"
            >
                <Icon variant="primary" className="fa-solid fa-book-open-reader" size="lg" />
                <TitleH4>{HOME_TEXTS.CURRENTLY_READING_TITLE}</TitleH4>
                {hiddenCount > 0 && (
                    <Text size="sm" variant="muted" weight="bold" $margin="0 0 0 auto">
                        {HOME_TEXTS.MORE_BOOKS(hiddenCount)}
                    </Text>
                )}
            </FlexContainer>
            {books.length === 0 ? (
                <FlexContainer
                    $flexDirection="column"
                    $alignItems="center"
                    $justifyContent="center"
                    $minHeight="22rem"
                    $padding="3rem 2rem"
                    $border="1px solid"
                    backgroundColorVariant="secondary"
                    $borderRadius="0.75rem"
                    hBorderColorVariant="primary"
                    hBoxShadowVariant="glow"
                >
                    <EmptyState
                        iconClassName="fa-solid fa-book-open-reader"
                        title={HOME_TEXTS.CURRENTLY_READING_EMPTY_TITLE}
                        description={HOME_TEXTS.CURRENTLY_READING_EMPTY_DESCRIPTION}
                        buttonLabel={HOME_TEXTS.CURRENTLY_READING_EMPTY_BUTTON}
                        buttonIconClassName="fa-solid fa-magnifying-glass"
                        onButtonClick={() => navigate(privateRoutes.search)}
                    />
                </FlexContainer>
            ) : (
                <GridContainer
                    $templateColumns="repeat(3, 1fr)"
                    $gap="1.5rem"
                    $mdTemplateColumns="repeat(2, 1fr)"
                    $smTemplateColumns="1fr"
                >
                    {books.map((book) => (
                        <CurrentlyReadingCard
                            key={book.bookshelfBookId}
                            book={book}
                            onUpdateProgress={onUpdateProgress}
                        />
                    ))}
                </GridContainer>
            )}
        </BaseContainer>
    );
};
