import styled from 'styled-components';

export interface IGridContainerProps {
    TemplateColumns?: string;
    TemplateRows?: string;
    Gap?: string;
    RowGap?: string;
    ColumnGap?: string;
    GridTemplateAreas?: string;
    GridAutoFlow?: string;
    GridAutoRows?: string;
    GridAutoColumns?: string;

    LgTemplateColumns?: string;
    LgGap?: string;
}

export const GridContainer = styled.div<IGridContainerProps>`
    display: grid;
    grid-template-columns: ${(props) => props.TemplateColumns};
    grid-template-rows: ${(props) => props.TemplateRows};
    gap: ${(props) => props.Gap};
    row-gap: ${(props) => props.RowGap};
    column-gap: ${(props) => props.ColumnGap};
    grid-template-areas: ${(props) => props.GridTemplateAreas};
    grid-auto-flow: ${(props) => props.GridAutoFlow};
    grid-auto-rows: ${(props) => props.GridAutoRows};
    grid-auto-columns: ${(props) => props.GridAutoColumns};

    @media (max-width: ${({theme}) => theme.breakpoints.lg}) {
        grid-template-columns: ${(props) => props.LgTemplateColumns};
        gap: ${(props) => props.LgGap};
    }
`;
