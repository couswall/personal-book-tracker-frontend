import styled from 'styled-components';
import {BaseContainer, IBaseContainerProps} from '@components/Layout/BaseContainer/index';

export interface IGridContainerProps extends IBaseContainerProps {
    $templateColumns?: string;
    $templateRows?: string;
    $rowGap?: string;
    $columnGap?: string;
    $gridTemplateAreas?: string;
    $gridAutoFlow?: string;
    $gridAutoRows?: string;
    $gridAutoColumns?: string;

    $lgTemplateColumns?: string;
    $lgGap?: string;

    $mdTemplateColumns?: string;
    $mdGap?: string;

    $smTemplateColumns?: string;
    $smGap?: string;
}

export const GridContainer = styled(BaseContainer)<IGridContainerProps>`
    display: grid;
    background-color: ${(props) => props.$backgroundColor ?? 'transparent'};
    grid-template-columns: ${(props) => props.$templateColumns};
    grid-template-rows: ${(props) => props.$templateRows};
    row-gap: ${(props) => props.$rowGap};
    column-gap: ${(props) => props.$columnGap};
    grid-template-areas: ${(props) => props.$gridTemplateAreas};
    grid-auto-flow: ${(props) => props.$gridAutoFlow};
    grid-auto-rows: ${(props) => props.$gridAutoRows};
    grid-auto-columns: ${(props) => props.$gridAutoColumns};

    @media (max-width: ${({theme}) => theme.breakpoints.lg}) {
        grid-template-columns: ${(props) => props.$lgTemplateColumns};
        gap: ${(props) => props.$lgGap};
    }

    @media (max-width: ${({theme}) => theme.breakpoints.md}) {
        grid-template-columns: ${(props) => props.$mdTemplateColumns};
        gap: ${(props) => props.$mdGap};
    }

    @media (max-width: ${({theme}) => theme.breakpoints.sm}) {
        grid-template-columns: ${(props) => props.$smTemplateColumns};
        gap: ${(props) => props.$smGap};
    }
`;
