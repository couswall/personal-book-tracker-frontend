import {
    BaseContainer,
    Button,
    FlexContainer,
    GridContainer,
    Icon,
    RatingStars,
    Text,
} from '@components/index';
import * as S from '@pages/Book/components/BookReviews/bookReviews.styled';
import {
    BOOK_REVIEWS_TEXTS,
    GLOBAL_RATING_SUMMARY,
    RATING_BARS,
} from '@pages/Book/components/BookReviews/bookReviews.constants';

export const GlobalRating = () => (
    <BaseContainer as="section">
        <BaseContainer
            backgroundColorVariant="secondary"
            $borderRadius="1rem"
            $padding="2.5rem"
            $lgPadding="1.5rem"
            $border="1px solid"
        >
            <GridContainer
                $templateColumns="repeat(12, minmax(0, 1fr))"
                $mdTemplateColumns="1fr"
                $gap="2rem"
                $alignItems="center"
            >
                <S.GlobalScoreCol>
                    <S.BigScoreValue>{GLOBAL_RATING_SUMMARY.score}</S.BigScoreValue>
                    <RatingStars rating={Number(GLOBAL_RATING_SUMMARY.score)} size="1.125rem" />
                    <Text variant="muted" size="sm" weight="medium" $marginTop="0.5rem">
                        {GLOBAL_RATING_SUMMARY.totalReviews}
                    </Text>
                    <Button
                        variant="primary"
                        $marginTop="1.5rem"
                        size="lg"
                        leftIcon={
                            <Icon $fontColor="inherit" className="fa-solid fa-pen-to-square" />
                        }
                    >
                        {BOOK_REVIEWS_TEXTS.WRITE_REVIEW}
                    </Button>
                </S.GlobalScoreCol>
                <S.ProgressBarsCol>
                    {RATING_BARS.map(({label, percentage, opacity, white}) => (
                        <FlexContainer
                            $alignItems="center"
                            $gap="1rem"
                            key={label}
                            $backgroundColor="inherit"
                        >
                            <Text
                                size="sm"
                                weight="medium"
                                variant="muted"
                                $width="3rem"
                                $flexShrink="0"
                            >
                                {label}
                            </Text>
                            <S.ProgressBarTrack>
                                <S.ProgressBarFill
                                    $percentage={percentage}
                                    $opacity={opacity}
                                    style={white ? {backgroundColor: '#fff'} : undefined}
                                />
                            </S.ProgressBarTrack>
                            <Text
                                size="sm"
                                weight="medium"
                                $width="3rem"
                                $textAlign="right"
                                $opacity="0.8"
                            >
                                {percentage}%
                            </Text>
                        </FlexContainer>
                    ))}
                </S.ProgressBarsCol>
            </GridContainer>
        </BaseContainer>
    </BaseContainer>
);
