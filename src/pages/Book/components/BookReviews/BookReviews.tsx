import {FlexContainer} from '@components/index';
import {YourReview} from '@pages/Book/components/BookReviews/YourReview';
import {GlobalRating} from '@pages/Book/components/BookReviews/GlobalRating';
import {CommunityReviews} from '@pages/Book/components/BookReviews/CommunityReviews';

export const BookReviews = () => (
    <FlexContainer FlexDirection="column" Gap="3rem" MarginTop="3rem">
        <YourReview />
        <GlobalRating />
        <CommunityReviews />
    </FlexContainer>
);
