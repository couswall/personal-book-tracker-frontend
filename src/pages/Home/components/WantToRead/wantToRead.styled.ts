import styled from 'styled-components';
import {FlexContainer, Text} from '@components/index';

export const ScrollRow = styled(FlexContainer)`
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

export const ShelfItem = styled(FlexContainer)``;

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
