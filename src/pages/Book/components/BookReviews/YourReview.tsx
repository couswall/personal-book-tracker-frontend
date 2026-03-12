import {BaseContainer, FlexContainer, Text, TitleH5} from '@components/index';
import * as S from '@pages/Book/components/BookReviews/BookReviews.styled';
import {AVATAR_URL} from '@pages/Book/Book.constants';

export const YourReview = () => (
    <BaseContainer as="section">
        <S.YourReviewCard>
            <S.YourReviewBadge>Your Review</S.YourReviewBadge>
            <FlexContainer
                AlignItems="center"
                Gap="1rem"
                MarginBottom="1.5rem"
                BackgroundColor="inherit"
            >
                <S.YourReviewAvatar $bgImage={AVATAR_URL} />
                <div>
                    <S.ReviewTitleText>You rated it 5 stars</S.ReviewTitleText>
                    <S.ReviewDateText>Written on Oct 24, 2025</S.ReviewDateText>
                </div>
            </FlexContainer>
            <BaseContainer BackgroundColor="inherit">
                <TitleH5 MarginBottom="0.5rem">
                    An absolute masterpiece of hard science fiction.
                </TitleH5>
                <Text FontStyle="italic" Opacity="0.8" LineHeight="1.625">
                    "I haven't felt this much wonder reading a book in years. The technical details
                    are fascinating but the heart of the story—the connection between the
                    characters—is what truly stays with you. Weir has outdone himself."
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
                    <i className="fa-solid fa-pen"></i> Edit
                </S.ReviewActionBtn>
                <S.ReviewActionBtn $danger>
                    <i className="fa-solid fa-trash"></i> Delete
                </S.ReviewActionBtn>
            </FlexContainer>
        </S.YourReviewCard>
    </BaseContainer>
);
