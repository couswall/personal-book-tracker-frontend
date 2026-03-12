import {
    BaseContainer,
    ButtonPrimary,
    FlexContainer,
    GridContainer,
    Icon,
    Text,
} from '@components/index';
import * as S from '@pages/Book/components/BookReviews/BookReviews.styled';
import {RATING_BARS} from '@pages/Book/Book.constants';

export const GlobalRating = () => (
    <BaseContainer as="section">
        <BaseContainer
            BackgroundColorVariant="secondary"
            BorderRadius="1rem"
            Padding="2.5rem"
            LgPadding="1.5rem"
            Border="1px solid"
        >
            <GridContainer
                TemplateColumns="repeat(12, minmax(0, 1fr))"
                MdTemplateColumns="1fr"
                Gap="2rem"
                AlignItems="center"
            >
                <S.GlobalScoreCol>
                    <S.BigScoreValue>4.7</S.BigScoreValue>
                    <S.StarRating style={{marginBottom: '0.5rem'}}>
                        {[...Array(4)].map((_, i) => (
                            <i key={i} className="fa-solid fa-star"></i>
                        ))}
                        <i className="fa-solid fa-star-half-stroke"></i>
                    </S.StarRating>
                    <Text variant="muted" size="sm" weight="medium">
                        12,482 total reviews
                    </Text>
                    <ButtonPrimary MarginTop="1.5rem" size="lg" Gap="0.5rem">
                        <Icon FontColor="inherit" className="fa-solid fa-pen-to-square" />
                        Write a Review
                    </ButtonPrimary>
                </S.GlobalScoreCol>
                <S.ProgressBarsCol>
                    {RATING_BARS.map(({label, percentage, opacity, white}) => (
                        <FlexContainer
                            AlignItems="center"
                            Gap="1rem"
                            key={label}
                            BackgroundColor="inherit"
                        >
                            <Text
                                size="sm"
                                weight="medium"
                                variant="muted"
                                Width="3rem"
                                FlexShrink="0"
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
                                Width="3rem"
                                TextAlign="right"
                                Opacity="0.8"
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
