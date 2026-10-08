import {BaseContainer, Button, FlexContainer, Text} from '@components/index';
import * as S from '@pages/Home/components/CurrentlyReading/currentlyReading.styled';
import {CoverBookImg} from '@pages/Book/components/CoverBookImg';
import {IShelfBook} from '@pages/Home/home.interfaces';
import {HOME_TEXTS, getBookDetailPath} from '@pages/Home/home.constants';

interface ICurrentlyReadingCardProps {
    book: IShelfBook;
    onUpdateProgress: (book: IShelfBook) => void;
}

export const CurrentlyReadingCard: React.FC<ICurrentlyReadingCardProps> = ({
    book,
    onUpdateProgress,
}) => {
    const bookPath = getBookDetailPath(book.apiBookId);
    const showPages = book.progressType === 'PAGE' && book.totalPages !== null;

    return (
        <FlexContainer
            $flexDirection="column"
            $overflow="hidden"
            $border="1px solid"
            backgroundColorVariant="secondary"
            $borderRadius="0.75rem"
            hBorderColorVariant="primary"
            hBoxShadowVariant="glow"
        >
            <S.BookLink to={bookPath} tabIndex={-1} aria-hidden>
                <FlexContainer $width="100%" $aspectRatio="3 / 4">
                    <CoverBookImg
                        imgSrc={book.coverImageUrl}
                        alt={book.title}
                        objectFit="cover"
                        borderRadius="0"
                        width="100%"
                        height="100%"
                    />
                </FlexContainer>
            </S.BookLink>
            <FlexContainer
                $flexDirection="column"
                $flex="1"
                $gap="0.75rem"
                $padding="1rem"
                $backgroundColor="transparent"
            >
                <BaseContainer $backgroundColor="transparent">
                    <S.BookLink to={bookPath}>
                        <Text
                            weight="bold"
                            $whiteSpace="nowrap"
                            $textOverflow="ellipsis"
                            $overflow="hidden"
                        >
                            {book.title}
                        </Text>
                    </S.BookLink>
                    <Text size="sm" variant="muted" $fontStyle="italic">
                        {book.authors.join(', ')}
                    </Text>
                </BaseContainer>
                <FlexContainer
                    $flexDirection="column"
                    $gap="0.5rem"
                    $marginTop="auto"
                    $backgroundColor="transparent"
                >
                    <FlexContainer $justifyContent="space-between" $backgroundColor="transparent">
                        <Text size="xs" weight="bold">
                            {HOME_TEXTS.PROGRESS_LABEL}
                        </Text>
                        <Text size="xs" weight="bold">
                            {book.readingProgress}%
                        </Text>
                    </FlexContainer>
                    <S.ProgressTrack>
                        <S.ProgressFill $percentage={book.readingProgress} />
                    </S.ProgressTrack>
                    {showPages && (
                        <Text size="xs" variant="muted">
                            {HOME_TEXTS.PAGE_OF(book.currentPage ?? 0, book.totalPages ?? 0)}
                        </Text>
                    )}
                    <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => onUpdateProgress(book)}
                    >
                        {HOME_TEXTS.UPDATE_PROGRESS}
                    </Button>
                </FlexContainer>
            </FlexContainer>
        </FlexContainer>
    );
};
