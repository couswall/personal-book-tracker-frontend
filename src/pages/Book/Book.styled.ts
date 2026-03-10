import {Button, FlexContainer, Icon, Text} from '@components/index';
import styled from 'styled-components';

export const LayoutContainer = styled.main`
    padding: 2rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        padding: 3rem;
    }
`;

export const TopSectionGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 3rem;
    }
`;

export const ImageColumn = styled.div`
    display: flex;
    justify-content: center;

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        grid-column: span 4 / span 4;
        justify-content: flex-start;
    }
`;

export const ImageWrapper = styled.div`
    width: 100%;
    max-width: 320px;
    aspect-ratio: 2 / 3;
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    position: relative;
    cursor: auto;

    transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
    &:hover {
        border-color: ${({theme}) => theme.colors.primaryColor};
        box-shadow: 0 0 15px ${({theme}) => theme.colors.primaryColor}26;
    }

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        max-width: none;
    }
`;

export const StyledCoverImg = styled.div<{$bgImage?: string}>`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;
    background-image: ${({$bgImage}) => ($bgImage ? `url("${$bgImage}")` : 'none')};

    ${ImageWrapper}:hover & {
        transform: scale(1.05);
    }
`;

export const InfoColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        grid-column: span 8 / span 8;
    }
`;

export const CategoryBadge = styled.span`
    background-color: ${({theme}) => theme.colors.primaryColor}1A;
    color: ${({theme}) => theme.colors.primaryColor};
    font-size: 10px;
    font-weight: bold;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 1px solid ${({theme}) => theme.colors.primaryColor}33;
`;

export const BookTitle = styled.h2`
    font-size: 1.875rem;
    line-height: 1.25;
    font-weight: bold;
    color: ${({theme}) => theme.colors.text.theme};
    margin-bottom: 0.5rem;

    @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
        font-size: 3rem;
    }
`;

export const AuthorText = styled(Text)`
    span {
        color: ${({theme}) => theme.colors.primaryLight};
    }
`;

export const StatsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 2rem;
    row-gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    border-top: 1px solid ${({theme}) => theme.colors.borderColor};
    border-bottom: 1px solid ${({theme}) => theme.colors.borderColor};
    padding: 1.5rem 0;
`;

export const StarRating = styled.div<{isPrimaryColor?: boolean}>`
    display: flex;
    gap: 4px;
    align-items: center;

    ${Icon} {
        color: ${({theme, isPrimaryColor}) =>
            isPrimaryColor ? theme.colors.primaryColor : theme.colors.primaryHover};
    }
`;

export const ActivityCard = styled(FlexContainer)`
    background-color: ${({theme}) => theme.colors.backgroundSecondary}80;
`;

export const IconCirclePrimary = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.primaryColor}33;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme}) => theme.colors.primaryColor};
`;

export const IconCircleSecondary = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: ${({theme}) => theme.colors.primaryLight}33;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({theme}) => theme.colors.primaryLight};
`;

export const TextLink = styled(Button)`
    font-size: 0.75rem;
    height: unset;
    padding: unset;
    color: ${({theme}) => theme.colors.primaryColor};
    font-weight: bold;
    background: none;
    border: none;

    &:hover:not(:disabled) {
        text-decoration: underline;
        background: unset;
        color: ${({theme}) => theme.colors.primaryColor};
        background-color: unset;
    }
`;

export const Divider = styled.div`
    height: 2.5rem;
    width: 1px;
    background-color: ${({theme}) => theme.colors.borderColor};
    display: none;
    @media (min-width: ${({theme}) => theme.breakpoints.md || '768px'}) {
        display: block;
    }
`;

export const ActionButtonsGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const DescriptionText = styled.div<{$showMore?: boolean}>`
    color: ${({theme}) => theme.colors.text.light};
    line-height: 1.625;
    position: relative;
    max-height: ${({$showMore}) => ($showMore ? 'none' : '100px')};
    overflow: hidden;
    margin-bottom: 0.5rem;

    ${({$showMore, theme}) =>
        !$showMore &&
        `
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background: linear-gradient(to bottom, transparent, ${theme.colors.background});
        }
    `}
`;

export const ShowMoreBtn = styled(Button)`
    color: ${({theme}) => theme.colors.primaryColor};
    font-weight: bold;
    font-size: 0.875rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0;
    margin-top: 0.5rem;

    &:hover:not(:disabled) {
        text-decoration: underline;
        background: unset;
        color: ${({theme}) => theme.colors.primaryColor};
        background-color: unset;
    }
`;

/* Static Custom CSS for pseudo elements */
// export const MockSectionCard = styled.div`
//     background-color: ${({theme}) => theme.colors.backgroundSecondary};
//     border-radius: 1rem;
//     padding: 1.5rem;
//     border: 1px solid ${({theme}) => theme.colors.borderColor};

//     @media (min-width: ${({theme}) => theme.breakpoints.lg || '1024px'}) {
//         padding: 2.5rem;
//     }
// `;

export const MockReviewAvatar = styled.div<{$bgImage?: string}>`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    border: 2px solid ${({theme}) => theme.colors.primaryColor}33; // 20%
    background-image: url(${({$bgImage}) => $bgImage || ''});
    flex-shrink: 0;
`;

export const MockSidebarCard = styled.section`
    background-color: ${({theme}) => theme.colors.backgroundSecondary};
    border-radius: 1rem;
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    padding: 1.5rem;
    position: sticky;
    top: 6rem;
`;

export const MockSidebarItemImg = styled.div<{$bgImage?: string}>`
    width: 5rem;
    height: 5rem;
    flex-shrink: 0;
    background-size: cover;
    background-position: center;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid ${({theme}) => theme.colors.borderColor};
    background-image: url(${({$bgImage}) => $bgImage || ''});
    transition: border-color 0.2s;
`;

export const MockSidebarItem = styled(FlexContainer)`
    background-color: inherit;
    gap: 1rem;
    cursor: pointer;
    &:hover ${MockSidebarItemImg} {
        border-color: ${({theme}) => theme.colors.primaryColor}80; // 50% opacity
    }
`;

export const MockSidebarItemTitle = styled(Text)`
    font-size: 0.875rem;
    font-weight: bold;
    transition: color 0.2s;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    ${MockSidebarItem}:hover & {
        color: ${({theme}) => theme.colors.primaryColor};
    }
`;

/* Reviews Section Styled Components */

// export const ReviewsContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 3rem;
//     margin-top: 3rem;
// `;

export const YourReviewCard = styled.div`
    background: linear-gradient(
        to bottom right,
        ${({theme}) => theme.colors.backgroundSecondary},
        ${({theme}) => theme.colors.background}
    );
    border-radius: 1rem;
    padding: 1.5rem;
    border: 2px solid ${({theme}) => theme.colors.primaryColor}4D; // 30%
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
    background-color: ${({theme}) => theme.colors.primaryColor}33; // 20%
    color: ${({theme}) => theme.colors.primaryColor};
    font-size: 10px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 1px solid ${({theme}) => theme.colors.primaryColor}4D; // 30%
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
    background-color: ${({theme}) => theme.colors.borderColor}; // 10% white in template
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
        border-color: ${({theme}) => theme.colors.primaryColor}80; // 50%
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
        box-shadow: 0 0 15px ${({theme}) => theme.colors.primaryColor}26; // 15%
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
    background-color: ${({theme}) => theme.colors.secondaryColor}1A; // 10%
    color: ${({theme}) => theme.colors.secondaryColor};
    font-size: 10px;
    padding: 2px 8px;
    border-radius: 9999px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 1px solid ${({theme}) => theme.colors.secondaryColor}33; // 20%
`;

export const ReviewCardBody = styled.div`
    // Holds the Title and Text
`;

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
        background-color: ${({theme}) => theme.colors.primaryColor}1A; // 10%
    }
`;

export const HelpfulIconWrapper = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    background-color: ${({theme}) => theme.colors.borderColor}4D; // 30%
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
    background-color: ${({theme}) => theme.colors.borderColor}4D; // 30%
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
