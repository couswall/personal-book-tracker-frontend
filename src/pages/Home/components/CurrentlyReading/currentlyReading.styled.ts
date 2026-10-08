import styled from 'styled-components';
import {Link} from 'react-router';

export const ProgressTrack = styled.div`
    width: 100%;
    height: 0.5rem;
    border-radius: 1rem;
    overflow: hidden;
    background-color: ${({theme}) => theme.colors.background};
`;

export const ProgressFill = styled.div<{$percentage: number}>`
    height: 100%;
    width: ${({$percentage}) => Math.min(Math.max($percentage, 0), 100)}%;
    border-radius: 1rem;
    background: linear-gradient(
        to right,
        ${({theme}) => theme.colors.primaryColor},
        ${({theme}) => theme.colors.secondaryColor}
    );
`;

export const BookLink = styled(Link)`
    display: block;
    min-width: 0;
    color: inherit;
    text-decoration: none;

    &:hover {
        color: ${({theme}) => theme.colors.primaryColor};
    }
`;
