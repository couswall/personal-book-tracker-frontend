import {
    BaseContainer,
    FlexContainer,
    Icon,
    IconWrapper,
    RatingStars,
    Text,
} from '@components/index';
import * as S from '@pages/Book/components/BookActivity/bookActivity.styled';
import {IBookActivityProps} from '@pages/Book/components/BookActivity/bookActivity.interfaces';
import {BOOK_ACTIVITY_TEXTS} from '@pages/Book/components/BookActivity/bookActivity.constants';

export const BookActivity: React.FC<IBookActivityProps> = ({
    onOpenAddToBookshelfModal,
    onUpdateProgress,
    bookshelfLabel,
    progressPercentage,
}) => {
    const isCurrentlyReading =
        bookshelfLabel?.toLowerCase() === BOOK_ACTIVITY_TEXTS.CURRENTLY_READING;
    const progressLabel =
        typeof progressPercentage === 'number'
            ? BOOK_ACTIVITY_TEXTS.PROGRESS_DONE(progressPercentage)
            : BOOK_ACTIVITY_TEXTS.TRACK_PROGRESS;

    return (
        <S.ActivityCard
            $flexDirection="column"
            $borderRadius="1rem"
            $padding="1.5rem"
            $border="1px solid"
            $gap="1rem"
            $marginBottom="2rem"
        >
            <Text variant="muted" weight="bold" size="xs" $textTransform="uppercase">
                {BOOK_ACTIVITY_TEXTS.YOUR_ACTIVITY}
            </Text>
            <FlexContainer
                $flexWrap="wrap"
                $gap="2rem"
                $alignItems="center"
                $backgroundColor="transparent"
            >
                <FlexContainer $alignItems="center" $gap="1rem" $backgroundColor="inherit">
                    <IconWrapper>
                        <Icon variant="primary" className="fa-solid fa-book" />
                    </IconWrapper>
                    <BaseContainer $backgroundColor="inherit">
                        <Text size="xs" variant="muted" weight="medium">
                            {BOOK_ACTIVITY_TEXTS.BOOKSHELF}
                        </Text>
                        <FlexContainer
                            $alignItems="center"
                            $gap="0.75rem"
                            $backgroundColor="inherit"
                        >
                            <Text size="sm" weight="bold">
                                {bookshelfLabel}
                            </Text>
                            <S.TextLink onClick={onOpenAddToBookshelfModal}>
                                {BOOK_ACTIVITY_TEXTS.MOVE_TO_ANOTHER_SHELF}
                            </S.TextLink>
                        </FlexContainer>
                    </BaseContainer>
                </FlexContainer>

                {isCurrentlyReading && (
                    <>
                        <S.Divider />
                        <FlexContainer
                            $alignItems="center"
                            $gap="1rem"
                            $backgroundColor="transparent"
                        >
                            <IconWrapper>
                                <Icon variant="primary" className="fa-solid fa-bookmark" />
                            </IconWrapper>
                            <BaseContainer $backgroundColor="inherit">
                                <Text size="xs" variant="muted" weight="medium">
                                    {progressLabel}
                                </Text>
                                <S.TextLink onClick={onUpdateProgress}>
                                    {BOOK_ACTIVITY_TEXTS.UPDATE_PROGRESS}
                                </S.TextLink>
                            </BaseContainer>
                        </FlexContainer>
                    </>
                )}

                <S.Divider />

                <FlexContainer $alignItems="center" $gap="1rem" $backgroundColor="transparent">
                    <IconWrapper>
                        <Icon variant="primary" className="fa-solid fa-star" />
                    </IconWrapper>
                    <BaseContainer $backgroundColor="inherit">
                        <Text size="xs" variant="muted" weight="medium">
                            {BOOK_ACTIVITY_TEXTS.YOUR_RATING}
                        </Text>
                        <FlexContainer
                            $alignItems="center"
                            $gap="0.75rem"
                            $backgroundColor="inherit"
                        >
                            <RatingStars rating={5} />
                            <S.TextLink>{BOOK_ACTIVITY_TEXTS.EDIT_RATING}</S.TextLink>
                        </FlexContainer>
                    </BaseContainer>
                </FlexContainer>
            </FlexContainer>
        </S.ActivityCard>
    );
};
