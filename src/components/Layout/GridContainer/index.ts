import styled from 'styled-components';

export interface IGridContainerProps {
    $templateColumns?: string;
    $templateRows?: string;
    $gap?: string;
    $rowGap?: string;
    $columnGap?: string;
    $gridTemplateAreas?: string;
    $gridAutoFlow?: string;
    $gridAutoRows?: string;
    $gridAutoColumns?: string;
    $alignItems?: string;

    $lgTemplateColumns?: string;
    $lgGap?: string;

    $mdTemplateColumns?: string;
    $mdGap?: string;
}

export const GridContainer = styled.div<IGridContainerProps>`
    display: grid;
    grid-template-columns: ${(props) => props.$templateColumns};
    grid-template-rows: ${(props) => props.$templateRows};
    gap: ${(props) => props.$gap};
    row-gap: ${(props) => props.$rowGap};
    column-gap: ${(props) => props.$columnGap};
    grid-template-areas: ${(props) => props.$gridTemplateAreas};
    grid-auto-flow: ${(props) => props.$gridAutoFlow};
    grid-auto-rows: ${(props) => props.$gridAutoRows};
    grid-auto-columns: ${(props) => props.$gridAutoColumns};
    align-items: ${(props) => props.$alignItems};

    @media (max-width: ${({theme}) => theme.breakpoints.lg}) {
        grid-template-columns: ${(props) => props.$lgTemplateColumns};
        gap: ${(props) => props.$lgGap};
    }

    @media (max-width: ${({theme}) => theme.breakpoints.md}) {
        grid-template-columns: ${(props) => props.$mdTemplateColumns};
        gap: ${(props) => props.$mdGap};
    }
`;
