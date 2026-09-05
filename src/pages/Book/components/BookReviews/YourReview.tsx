import {BaseContainer, FlexContainer, Text, TitleH5} from '@components/index';
import * as S from '@pages/Book/components/BookReviews/bookReviews.styled';
import {
    AVATAR_URL,
    BOOK_REVIEWS_TEXTS,
    YOUR_REVIEW,
} from '@pages/Book/components/BookReviews/bookReviews.constants';

export const YourReview = () => (
    <BaseContainer as="section">
        <S.YourReviewCard>
            <S.YourReviewBadge>{BOOK_REVIEWS_TEXTS.YOUR_REVIEW_BADGE}</S.YourReviewBadge>
            <FlexContainer
                AlignItems="center"
                Gap="1rem"
                MarginBottom="1.5rem"
                BackgroundColor="inherit"
            >
                <S.YourReviewAvatar $bgImage={AVATAR_URL} />
                <div>
                    <S.ReviewTitleText>{YOUR_REVIEW.ratingLabel}</S.ReviewTitleText>
                    <S.ReviewDateText>{YOUR_REVIEW.writtenOn}</S.ReviewDateText>
                </div>
            </FlexContainer>
            <BaseContainer BackgroundColor="inherit">
                <TitleH5 MarginBottom="0.5rem">{YOUR_REVIEW.heading}</TitleH5>
                <Text FontStyle="italic" Opacity="0.8" LineHeight="1.625">
                    {YOUR_REVIEW.body}
                </Text>
            </BaseContainer>
            <FlexContainer
                AlignItems="center"
                Gap="1rem"
                PaddingTop="1.5rem"
                BorderTop="1px solid"
                BackgroundColor="inherit"
            >
                <S.ReviewActionBtn>
                    <i className="fa-solid fa-pen"></i> {BOOK_REVIEWS_TEXTS.EDIT}
                </S.ReviewActionBtn>
                <S.ReviewActionBtn $danger>
                    <i className="fa-solid fa-trash"></i> {BOOK_REVIEWS_TEXTS.DELETE}
                </S.ReviewActionBtn>
            </FlexContainer>
        </S.YourReviewCard>
    </BaseContainer>
);
