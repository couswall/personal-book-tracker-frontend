import styled from 'styled-components';
import {Button, Icon, Text} from '@components/index';

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

export const StarRating = styled.div<{isPrimaryColor?: boolean}>`
    display: flex;
    gap: 4px;
    align-items: center;

    ${Icon} {
        color: ${({theme, isPrimaryColor}) =>
            isPrimaryColor ? theme.colors.primaryColor : theme.colors.primaryHover};
    }
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
