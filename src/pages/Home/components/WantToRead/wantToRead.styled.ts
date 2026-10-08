import styled from 'styled-components';
import {Link} from 'react-router';
import {FlexContainer, Text} from '@components/index';

export const ScrollRow = styled(FlexContainer)`
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const ShelfItem = styled(Link)`
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    width: 9.5rem;
    color: inherit;
    text-decoration: none;

    @media (max-width: ${({theme}) => theme.breakpoints.lg}) {
        width: 8.5rem;
    }
`;

export const ShelfCoverWrapper = styled(FlexContainer)`
    transition: border-color 0.3s ease;

    ${ShelfItem}:hover & {
        border-color: ${({theme}) => theme.colors.primaryColor}80;
    }
`;

export const ShelfTitle = styled(Text)`
    transition: color 0.2s ease;

    ${ShelfItem}:hover & {
        color: ${({theme}) => theme.colors.primaryColor};
    }
`;
