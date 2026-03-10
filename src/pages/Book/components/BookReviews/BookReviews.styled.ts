import styled from 'styled-components';

export { StarRating } from '@pages/Book/Book.styled';

/* ── Your Review ── */

export const YourReviewCard = styled.div`
    background: linear-gradient(
        to bottom right,
        ${({theme}) => theme.colors.backgroundSecondary},
        ${({theme}) => theme.colors.background}
    );
    border-radius: 1rem;
    padding: 1.5rem;
    border: 2px solid ${({theme}) => theme.colors.primaryColor}4D;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        padding: 2rem;
    }
`;

export const YourReviewBadge = styled.span`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: ${({theme}) => theme.colors.primaryColor}33;
    color: ${({theme}) => theme.colors.primaryColor};
    font-size: 10px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 1px solid ${({theme}) => theme.colors.primaryColor}4D;
`;

export const ReviewHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

export const YourReviewAvatar = styled.div<{$bgImage?: string}>`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: 2px solid ${({theme}) => theme.colors.primaryColor};
    background-image: url(${({$bgImage}) => $bgImage || ''});
    flex-shrink: 0;
`;

export const ReviewTitleText = styled.h4`
    color: ${({theme}) => theme.colors.text.theme};
    font-weight: bold;
`;

export const ReviewDateText = styled.p`
    font-size: 0.75rem;
    color: ${({theme}) => theme.colors.text.light};
`;

export const ReviewContentContainer = styled.div`
    margin-bottom: 1.5rem;
`;

export const ReviewHeading = styled.h5`
    color: ${({theme}) => theme.colors.text.theme};
    font-weight: bold;
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
`;

export const ReviewBodyText = styled.p`
    color: ${({theme}) => theme.colors.text.theme};
    opacity: 0.8;
    line-height: 1.625;
    font-style: italic;
`;

export const ReviewActionsBar = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
`;

export const ReviewActionBtn = styled.button<{$danger?: boolean}>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    color: ${({$danger, theme}) => ($danger ? theme.colors.text.light : theme.colors.primaryColor)};
    transition: color 0.2s;

    &:hover {
        color: ${({$danger, theme}) => ($danger ? theme.colors.danger : theme.colors.primaryHover)};
    }

    i {
        font-size: 1.125rem;
    }
`;

/* ── Global Rating ── */

export const GlobalRatingCard = styled.div`
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid ${({theme}) => theme.colors.borderColor};

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        padding: 2.5rem;
    }
`;

export const GlobalRatingGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;

    @media (min-width: ${({theme}) => theme.breakpoints.md || '768px'}) {
        grid-template-columns: repeat(12, minmax(0, 1fr));
    }
`;

export const GlobalScoreCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};

    @media (min-width: ${({theme}) => theme.breakpoints.md || '768px'}) {
        grid-column: span 4 / span 4;
        align-items: flex-start;
        text-align: left;
        border-bottom: none;
        padding-bottom: 0;
        border-right: 1px solid ${({theme}) => theme.colors.borderColor};
        padding-right: 2rem;
    }
`;

export const BigScoreValue = styled.span`
    font-size: 3rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.text.theme};
    margin-bottom: 0.5rem;

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        font-size: 4.5rem;
    }
`;

export const TotalReviewsText = styled.p`
    color: ${({theme}) => theme.colors.text.light};
    font-size: 0.875rem;
    font-weight: 500;
`;

export const WriteReviewBtn = styled.button`
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.75rem 1.5rem;
    background-color: ${({theme}) => theme.colors.primaryColor};
    color: ${({theme}) => theme.colors.background};
    font-weight: bold;
    border-radius: 0.75rem;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    box-shadow: 0 10px 15px -3px ${({theme}) => theme.colors.primaryColor}33;

    &:hover {
        background-color: ${({theme}) => theme.colors.primaryHover};
    }
`;

export const ProgressBarsCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (min-width: ${({theme}) => theme.breakpoints.md || '768px'}) {
        grid-column: span 8 / span 8;
    }
`;

export const ProgressBarRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const StarLabel = styled.span`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors.text.light};
    width: 3rem;
    flex-shrink: 0;
`;

export const ProgressBarTrack = styled.div`
    flex-grow: 1;
    height: 0.625rem;
    background-color: ${({theme}) => theme.colors.borderColor};
    border-radius: 9999px;
    overflow: hidden;
`;

export const ProgressBarFill = styled.div<{$percentage: number; $opacity?: number}>`
    height: 100%;
    background-color: ${({theme}) => theme.colors.primaryColor};
    width: ${({$percentage}) => $percentage}%;
    border-radius: 9999px;
    opacity: ${({$opacity}) => $opacity || 1};
`;

export const PercentLabel = styled.span`
    font-size: 0.875rem;
    font-weight: 500;
    color: ${({theme}) => theme.colors.text.theme};
    width: 3rem;
    text-align: right;
    opacity: 0.8;
`;

/* ── Community Reviews ── */

export const CommunityReviewsHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

export const CommunityReviewsTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.text.theme};
`;

export const SortContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const SortLabel = styled.span`
    color: ${({theme}) => theme.colors.text.light};
    font-size: 0.875rem;
`;

export const SortDropdownBtn = styled.button`
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    color: ${({theme}) => theme.colors.text.theme};
    font-size: 0.875rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
        border-color: ${({theme}) => theme.colors.primaryColor}80;
    }
`;

export const ReviewCard = styled.div`
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    padding: 1.5rem;
    border-radius: 1rem;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;

    &:hover {
        border-color: ${({theme}) => theme.colors.primaryColor};
        box-shadow: 0 0 15px ${({theme}) => theme.colors.primaryColor}26;
    }

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        padding: 2rem;
    }
`;

export const ReviewCardHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
`;

export const ReviewerInfoBlock = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

export const ReviewerDetails = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const ReviewerNameAndBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const ReviewerName = styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.text.theme};
`;

export const VerifiedBadge = styled.span`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: ${({theme}) => theme.colors.secondaryColor}1A;
    color: ${({theme}) => theme.colors.secondaryColor};
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 9999px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 1px solid ${({theme}) => theme.colors.secondaryColor}33;
`;

export const ReviewCardBody = styled.div``;

export const ReviewCardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
`;

export const ReviewInteractions = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

export const InteractionBtn = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: bold;
    color: ${({theme}) => theme.colors.text.light};
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: ${({theme}) => theme.colors.text.theme};
    }

    &.helpful:hover {
        color: ${({theme}) => theme.colors.primaryColor};
    }

    &.helpful:hover div {
        background-color: ${({theme}) => theme.colors.primaryColor}1A;
    }
`;

export const HelpfulIconWrapper = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    background-color: ${({theme}) => theme.colors.borderColor}4D;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
`;

export const MoreOptionsBtn = styled.button`
    color: ${({theme}) => theme.colors.text.light};
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: ${({theme}) => theme.colors.text.theme};
    }
`;

export const LoadMoreBtn = styled.button`
    width: 100%;
    margin-top: 2rem;
    padding: 1rem 0;
    background-color: ${({theme}) => theme.colors.borderColor}4D;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    border-radius: 0.75rem;
    color: ${({theme}) => theme.colors.text.light};
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${({theme}) => theme.colors.borderColor};
        color: ${({theme}) => theme.colors.text.theme};
    }
`;
