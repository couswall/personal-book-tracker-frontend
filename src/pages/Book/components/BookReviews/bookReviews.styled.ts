import styled from 'styled-components';

export {StarRating} from '@pages/Book/book.styled';
export * from '@pages/Book/components/BookReviews/reviewCard.styled';

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

    @media (min-width: ${({theme}) => theme.breakpoints.lg ?? '1024px'}) {
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

export const YourReviewAvatar = styled.div<{$bgImage?: string}>`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: 2px solid ${({theme}) => theme.colors.primaryColor};
    background-image: url(${({$bgImage}) => $bgImage ?? ''});
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

export const ReviewActionBtn = styled.button<{$danger?: boolean}>`
    display: flex;
    font-family: inherit;
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

export const GlobalScoreCol = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};

    @media (min-width: ${({theme}) => theme.breakpoints.md ?? '768px'}) {
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

    @media (min-width: ${({theme}) => theme.breakpoints.lg ?? '1024px'}) {
        font-size: 4.5rem;
    }
`;

export const ProgressBarsCol = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    @media (min-width: ${({theme}) => theme.breakpoints.md ?? '768px'}) {
        grid-column: span 8 / span 8;
    }
`;

export const ProgressBarTrack = styled.div`
    flex-grow: 1;
    height: 0.625rem;
    background-color: ${({theme}) => theme.colors.borderColor};
    border-radius: 2rem;
    overflow: hidden;
`;

export const ProgressBarFill = styled.div<{$percentage: number; $opacity?: number}>`
    height: 100%;
    background-color: ${({theme}) => theme.colors.primaryColor};
    width: ${({$percentage}) => $percentage}%;
    border-radius: 2rem;
    opacity: ${({$opacity}) => $opacity ?? 1};
`;
