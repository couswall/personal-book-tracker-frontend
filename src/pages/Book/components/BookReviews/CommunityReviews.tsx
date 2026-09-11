import {
    BaseContainer,
    Button,
    FlexContainer,
    Icon,
    RatingStars,
    Text,
    TitleH4,
    TitleH5,
} from '@components/index';
import * as S from '@pages/Book/components/BookReviews/bookReviews.styled';
import {
    AVATAR_URL,
    BOOK_REVIEWS_TEXTS,
    COMMUNITY_REVIEWS,
} from '@pages/Book/components/BookReviews/bookReviews.constants';

export const CommunityReviews = () => (
    <BaseContainer as="section">
        <FlexContainer
            $alignItems="center"
            $justifyContent="space-between"
            $marginBottom="2rem"
            $flexWrap="wrap"
            $gap="1rem"
        >
            <TitleH4>{BOOK_REVIEWS_TEXTS.COMMUNITY_REVIEWS_TITLE}</TitleH4>
            <FlexContainer $alignItems="center" $gap="0.75rem">
                <Text size="sm" variant="muted">
                    {BOOK_REVIEWS_TEXTS.SORT_BY}
                </Text>
                <Button
                    variant="outline"
                    size="sm"
                    rightIcon={<Icon className="fa-solid fa-chevron-down" $fontColor="inherit" />}
                >
                    {BOOK_REVIEWS_TEXTS.MOST_HELPFUL}
                </Button>
            </FlexContainer>
        </FlexContainer>

        <FlexContainer $flexDirection="column" $gap="1.5rem" $backgroundColor="inherit">
            {COMMUNITY_REVIEWS.map((review) => (
                <S.ReviewCard key={review.name}>
                    <FlexContainer
                        $flexDirection="column"
                        $gap="1.5rem"
                        $marginBottom="1.5rem"
                        $backgroundColor="inherit"
                    >
                        <FlexContainer
                            $alignItems="center"
                            $justifyContent="space-between"
                            $backgroundColor="inherit"
                            $flexWrap="wrap"
                            $gap="0.75rem"
                        >
                            <FlexContainer
                                $alignItems="center"
                                $gap="1rem"
                                $backgroundColor="inherit"
                            >
                                <S.YourReviewAvatar $bgImage={AVATAR_URL} />
                                <BaseContainer $backgroundColor="inherit">
                                    <FlexContainer
                                        $alignItems="center"
                                        $gap="0.5rem"
                                        $backgroundColor="inherit"
                                    >
                                        <Text weight="bold">{review.name}</Text>
                                        {review.verified && (
                                            <S.VerifiedBadge>
                                                <i className="fa-solid fa-certificate"></i>{' '}
                                                {BOOK_REVIEWS_TEXTS.VERIFIED_PURCHASE}
                                            </S.VerifiedBadge>
                                        )}
                                    </FlexContainer>
                                    <S.ReviewDateText>{review.date}</S.ReviewDateText>
                                </BaseContainer>
                            </FlexContainer>
                            <RatingStars rating={review.stars} />
                        </FlexContainer>
                    </FlexContainer>
                    <BaseContainer $backgroundColor="inherit">
                        <TitleH5 MarginBottom="0.5rem">{review.heading}</TitleH5>
                        <Text Opacity="0.8" LineHeight="1.625">
                            {review.body}
                        </Text>
                    </BaseContainer>
                    <FlexContainer
                        $alignItems="center"
                        $justifyContent="space-between"
                        $backgroundColor="inherit"
                        $paddingTop="1rem"
                        $marginTop="1rem"
                        $borderTop="1px solid"
                    >
                        <FlexContainer
                            $alignItems="center"
                            $gap="1.5rem"
                            $backgroundColor="inherit"
                        >
                            <S.InteractionBtn className="helpful">
                                <S.HelpfulIconWrapper>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                </S.HelpfulIconWrapper>
                                {BOOK_REVIEWS_TEXTS.HELPFUL(review.helpful)}
                            </S.InteractionBtn>
                            <S.InteractionBtn>
                                <i className="fa-regular fa-comment"></i> {BOOK_REVIEWS_TEXTS.REPLY}
                            </S.InteractionBtn>
                        </FlexContainer>
                        <S.MoreOptionsBtn>
                            <i className="fa-solid fa-ellipsis"></i>
                        </S.MoreOptionsBtn>
                    </FlexContainer>
                </S.ReviewCard>
            ))}
        </FlexContainer>

        <Button variant="ghost" $marginTop="2rem" $width="100%">
            {BOOK_REVIEWS_TEXTS.LOAD_MORE_REVIEWS}
        </Button>
    </BaseContainer>
);
