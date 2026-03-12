import {
    BaseContainer,
    ButtonGhost,
    ButtonOutline,
    FlexContainer,
    Icon,
    Text,
    TitleH4,
    TitleH5,
} from '@components/index';
import * as S from '@pages/Book/components/BookReviews/BookReviews.styled';
import {StarRow} from '@pages/Book/components/BookReviews/StarRow';
import {AVATAR_URL, COMMUNITY_REVIEWS} from '@pages/Book/Book.constants';

export const CommunityReviews = () => (
    <BaseContainer as="section">
        <FlexContainer AlignItems="center" JustifyContent="space-between" MarginBottom="2rem">
            <TitleH4>Community Reviews</TitleH4>
            <FlexContainer AlignItems="center" Gap="0.75rem">
                <Text size="sm" variant="muted">
                    Sort by:
                </Text>
                <ButtonOutline size="sm" Gap="0.5rem">
                    Most Helpful <Icon className="fa-solid fa-chevron-down" FontColor="inherit" />
                </ButtonOutline>
            </FlexContainer>
        </FlexContainer>

        <FlexContainer FlexDirection="column" Gap="1.5rem" BackgroundColor="inherit">
            {COMMUNITY_REVIEWS.map((review) => (
                <S.ReviewCard key={review.name}>
                    <FlexContainer
                        FlexDirection="column"
                        Gap="1.5rem"
                        MarginBottom="1.5rem"
                        BackgroundColor="inherit"
                    >
                        <FlexContainer
                            AlignItems="center"
                            JustifyContent="space-between"
                            BackgroundColor="inherit"
                        >
                            <FlexContainer AlignItems="center" Gap="1rem" BackgroundColor="inherit">
                                <S.YourReviewAvatar $bgImage={AVATAR_URL} />
                                <BaseContainer BackgroundColor="inherit">
                                    <FlexContainer
                                        AlignItems="center"
                                        Gap="0.5rem"
                                        BackgroundColor="inherit"
                                    >
                                        <Text weight="bold">{review.name}</Text>
                                        {review.verified && (
                                            <S.VerifiedBadge>
                                                <i className="fa-solid fa-certificate"></i> Verified
                                                Purchase
                                            </S.VerifiedBadge>
                                        )}
                                    </FlexContainer>
                                    <S.ReviewDateText>{review.date}</S.ReviewDateText>
                                </BaseContainer>
                            </FlexContainer>
                            <StarRow count={review.stars} filled={review.stars < 5} />
                        </FlexContainer>
                    </FlexContainer>
                    <BaseContainer BackgroundColor="inherit">
                        <TitleH5 MarginBottom="0.5rem">{review.heading}</TitleH5>
                        <Text Opacity="0.8" LineHeight="1.625">
                            {review.body}
                        </Text>
                    </BaseContainer>
                    <FlexContainer
                        AlignItems="center"
                        JustifyContent="space-between"
                        BackgroundColor="inherit"
                        PaddingTop="1rem"
                        MarginTop="1rem"
                        BorderTop="1px solid"
                    >
                        <FlexContainer AlignItems="center" Gap="1.5rem" BackgroundColor="inherit">
                            <S.InteractionBtn className="helpful">
                                <S.HelpfulIconWrapper>
                                    <i className="fa-solid fa-thumbs-up"></i>
                                </S.HelpfulIconWrapper>
                                Helpful ({review.helpful})
                            </S.InteractionBtn>
                            <S.InteractionBtn>
                                <i className="fa-regular fa-comment"></i> Reply
                            </S.InteractionBtn>
                        </FlexContainer>
                        <S.MoreOptionsBtn>
                            <i className="fa-solid fa-ellipsis"></i>
                        </S.MoreOptionsBtn>
                    </FlexContainer>
                </S.ReviewCard>
            ))}
        </FlexContainer>

        <ButtonGhost MarginTop="2rem" Width="100%">
            Load more reviews
        </ButtonGhost>
    </BaseContainer>
);
