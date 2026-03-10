import { FlexContainer } from '@components/index';
import * as S from '../Book.styled';

const AVATAR_URL =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBSSXSJ8MaJ1EsShAO28sa_EwbtiqSO-7L-elfvDMA8OflYJhlNQgqfXxgFrakihXCwa5bFmOPKgMvNo7CGen3SjnPce8WtGnftBbys8ttD7FMyBioSVU29kYT_n0Eyhnmhnndzk1t9lsW0Odn6xfospEUKgJnMR0pDN4qujQboRtmMVVL0ycy0gnOjSCuft81_a4V08tH_UM9vzKJ-7bNiVB-c2jOTFK31jXSeZtHldX1bZojCzxo-UnHk81VC-HDaxBubc6TQDlA';

const RATING_BARS = [
    { label: '5 Stars', percentage: 78, opacity: 1 },
    { label: '4 Stars', percentage: 15, opacity: 0.7 },
    { label: '3 Stars', percentage: 4, opacity: 0.4 },
    { label: '2 Stars', percentage: 2, opacity: 0.1, white: true },
    { label: '1 Stars', percentage: 1, opacity: 0.1, white: true },
];

const COMMUNITY_REVIEWS = [
    {
        name: 'Sarah Jenkins',
        date: 'September 12, 2025',
        verified: true,
        stars: 5,
        heading: 'A Masterpiece of Hard Sci-Fi',
        body: "Absolutely phenomenal. Andy Weir does it again. The scientific accuracy paired with such an emotional core was just perfect. The friendship that develops in this book is one of my favorites in all of literature. I couldn't put it down!",
        helpful: 24,
    },
    {
        name: 'Alex Rivera',
        date: 'August 28, 2025',
        verified: false,
        stars: 4,
        heading: 'Great follow-up to The Martian',
        body: "A bit slower than The Martian at the start, but once it picks up, it's impossible to put down. Ryland is a great protagonist, though he felt a bit familiar at times. The mystery of the mission was executed brilliantly. High stakes and high intelligence!",
        helpful: 8,
    },
];

const StarRow = ({ count, filled = true }: { count: number; filled?: boolean }) => (
    <S.StarRating>
        {[...Array(5)].map((_, i) => (
            <i
                key={i}
                className={i < count ? 'fa-solid fa-star' : filled ? 'fa-regular fa-star' : 'fa-solid fa-star'}
            ></i>
        ))}
    </S.StarRating>
);

export const BookReviews = () => (
    <FlexContainer FlexDirection='column' Gap='3rem' MarginTop='3rem'>
        {/* Your Review */}
        <section>
            <S.YourReviewCard>
                <S.YourReviewBadge>Your Review</S.YourReviewBadge>
                <S.ReviewHeader>
                    <S.YourReviewAvatar $bgImage={AVATAR_URL} />
                    <div>
                        <S.ReviewTitleText>You rated it 5 stars</S.ReviewTitleText>
                        <S.ReviewDateText>Written on Oct 24, 2025</S.ReviewDateText>
                    </div>
                </S.ReviewHeader>
                <S.ReviewContentContainer>
                    <S.ReviewHeading>An absolute masterpiece of hard science fiction.</S.ReviewHeading>
                    <S.ReviewBodyText>
                        "I haven't felt this much wonder reading a book in years. The technical details are fascinating
                        but the heart of the story—the connection between the characters—is what truly stays with you.
                        Weir has outdone himself."
                    </S.ReviewBodyText>
                </S.ReviewContentContainer>
                <S.ReviewActionsBar>
                    <S.ReviewActionBtn>
                        <i className="fa-solid fa-pen"></i> Edit
                    </S.ReviewActionBtn>
                    <S.ReviewActionBtn $danger>
                        <i className="fa-solid fa-trash"></i> Delete
                    </S.ReviewActionBtn>
                </S.ReviewActionsBar>
            </S.YourReviewCard>
        </section>

        {/* Global Rating Breakdown */}
        <section>
            <S.GlobalRatingCard>
                <S.GlobalRatingGrid>
                    <S.GlobalScoreCol>
                        <S.BigScoreValue>4.7</S.BigScoreValue>
                        <S.StarRating style={{ marginBottom: '0.5rem' }}>
                            {[...Array(4)].map((_, i) => (
                                <i key={i} className="fa-solid fa-star"></i>
                            ))}
                            <i className="fa-solid fa-star-half-stroke"></i>
                        </S.StarRating>
                        <S.TotalReviewsText>12,482 total reviews</S.TotalReviewsText>
                        <S.WriteReviewBtn>
                            <i className="fa-solid fa-pen-to-square"></i> Write a Review
                        </S.WriteReviewBtn>
                    </S.GlobalScoreCol>
                    <S.ProgressBarsCol>
                        {RATING_BARS.map(({ label, percentage, opacity, white }) => (
                            <S.ProgressBarRow key={label}>
                                <S.StarLabel>{label}</S.StarLabel>
                                <S.ProgressBarTrack>
                                    <S.ProgressBarFill
                                        $percentage={percentage}
                                        $opacity={opacity}
                                        style={white ? { backgroundColor: '#fff' } : undefined}
                                    />
                                </S.ProgressBarTrack>
                                <S.PercentLabel>{percentage}%</S.PercentLabel>
                            </S.ProgressBarRow>
                        ))}
                    </S.ProgressBarsCol>
                </S.GlobalRatingGrid>
            </S.GlobalRatingCard>
        </section>

        {/* Community Reviews */}
        <section>
            <S.CommunityReviewsHeader>
                <S.CommunityReviewsTitle>Community Reviews</S.CommunityReviewsTitle>
                <S.SortContainer>
                    <S.SortLabel>Sort by:</S.SortLabel>
                    <S.SortDropdownBtn>
                        Most Helpful <i className="fa-solid fa-chevron-down"></i>
                    </S.SortDropdownBtn>
                </S.SortContainer>
            </S.CommunityReviewsHeader>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {COMMUNITY_REVIEWS.map((review) => (
                    <S.ReviewCard key={review.name}>
                        <S.ReviewCardHeader>
                            <S.ReviewerInfoBlock>
                                <S.ReviewerDetails>
                                    <S.YourReviewAvatar $bgImage={AVATAR_URL} />
                                    <div>
                                        <S.ReviewerNameAndBadge>
                                            <S.ReviewerName>{review.name}</S.ReviewerName>
                                            {review.verified && (
                                                <S.VerifiedBadge>
                                                    <i className="fa-solid fa-certificate"></i> Verified Purchase
                                                </S.VerifiedBadge>
                                            )}
                                        </S.ReviewerNameAndBadge>
                                        <S.ReviewDateText>{review.date}</S.ReviewDateText>
                                    </div>
                                </S.ReviewerDetails>
                                <StarRow count={review.stars} filled={review.stars < 5} />
                            </S.ReviewerInfoBlock>
                        </S.ReviewCardHeader>
                        <S.ReviewCardBody>
                            <S.ReviewHeading>{review.heading}</S.ReviewHeading>
                            <S.ReviewBodyText style={{ fontStyle: 'normal' }}>{review.body}</S.ReviewBodyText>
                        </S.ReviewCardBody>
                        <S.ReviewCardFooter>
                            <S.ReviewInteractions>
                                <S.InteractionBtn className="helpful">
                                    <S.HelpfulIconWrapper>
                                        <i className="fa-solid fa-thumbs-up"></i>
                                    </S.HelpfulIconWrapper>
                                    Helpful ({review.helpful})
                                </S.InteractionBtn>
                                <S.InteractionBtn>
                                    <i className="fa-regular fa-comment"></i> Reply
                                </S.InteractionBtn>
                            </S.ReviewInteractions>
                            <S.MoreOptionsBtn>
                                <i className="fa-solid fa-ellipsis"></i>
                            </S.MoreOptionsBtn>
                        </S.ReviewCardFooter>
                    </S.ReviewCard>
                ))}
            </div>

            <S.LoadMoreBtn>Load more reviews</S.LoadMoreBtn>
        </section>
    </FlexContainer>
);
