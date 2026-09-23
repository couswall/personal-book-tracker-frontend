import {
    BaseContainer,
    Button,
    FlexContainer,
    GridContainer,
    Icon,
    Image,
    Text,
    TitleH4,
} from '@components/index';
import * as S from '@pages/Home/components/CurrentlyReading/currentlyReading.styled';
import {EmptyState} from '@pages/Home/components/EmptyState/EmptyState';
import {IHomeReadingBook} from '@pages/Home/home.interfaces';
import {HOME_TEXTS} from '@pages/Home/home.constants';

interface ICurrentlyReadingProps {
    books: IHomeReadingBook[];
}

export const CurrentlyReading: React.FC<ICurrentlyReadingProps> = ({books}) => (
    <BaseContainer as="section">
        <FlexContainer
            $alignItems="center"
            $gap="0.5rem"
            $marginBottom="1.5rem"
            $backgroundColor="transparent"
        >
            <Icon variant="primary" className="fa-solid fa-book-open-reader" size="lg" />
            <TitleH4>{HOME_TEXTS.CURRENTLY_READING_TITLE}</TitleH4>
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
                    buttonIconClassName="fa-solid fa-circle-play"
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
                    <FlexContainer
                        key={book.id}
                        $flexDirection="column"
                        $overflow="hidden"
                        $border="1px solid"
                        backgroundColorVariant="secondary"
                        $borderRadius="0.75rem"
                        hBorderColorVariant="primary"
                        hBoxShadowVariant="glow"
                    >
                        <FlexContainer $width="100%" $aspectRatio="3 / 4">
                            <Image src={book.coverImageUrl} alt={book.title} $objectFit="cover" />
                        </FlexContainer>
                        <FlexContainer
                            $flexDirection="column"
                            $flex="1"
                            $gap="0.75rem"
                            $padding="1rem"
                            $backgroundColor="transparent"
                        >
                            <BaseContainer $backgroundColor="transparent">
                                <Text
                                    weight="bold"
                                    $whiteSpace="nowrap"
                                    $textOverflow="ellipsis"
                                    $overflow="hidden"
                                >
                                    {book.title}
                                </Text>
                                <Text size="sm" variant="muted" $fontStyle="italic">
                                    {book.author}
                                </Text>
                            </BaseContainer>
                            <FlexContainer
                                $flexDirection="column"
                                $gap="0.5rem"
                                $marginTop="auto"
                                $backgroundColor="transparent"
                            >
                                <FlexContainer
                                    $justifyContent="space-between"
                                    $backgroundColor="transparent"
                                >
                                    <Text size="xs" weight="bold">
                                        {HOME_TEXTS.PROGRESS_LABEL}
                                    </Text>
                                    <Text size="xs" weight="bold">
                                        {book.progressPercentage}%
                                    </Text>
                                </FlexContainer>
                                <S.ProgressTrack>
                                    <S.ProgressFill $percentage={book.progressPercentage} />
                                </S.ProgressTrack>
                                <Button variant="primary" size="sm" fullWidth>
                                    {HOME_TEXTS.UPDATE_PROGRESS}
                                </Button>
                            </FlexContainer>
                        </FlexContainer>
                    </FlexContainer>
                ))}
            </GridContainer>
        )}
    </BaseContainer>
);
