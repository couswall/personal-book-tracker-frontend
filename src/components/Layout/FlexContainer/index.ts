import styled from 'styled-components';
import {BaseContainer, IBaseContainerProps} from '@components/Layout/BaseContainer/index';

export interface IFlexContainerProps extends IBaseContainerProps {
    $flexWrap?: string;
    $flexDirection?: string;
    $flex?: string;
}

export const FlexContainer = styled(BaseContainer)<IFlexContainerProps>`
    display: flex;
    flex-direction: ${(props) => props.$flexDirection || 'row'};
    flex-wrap: ${(props) => props.$flexWrap || 'nowrap'};
    flex: ${(props) => props.$flex || 'unset'};
    align-items: ${(props) => props.$alignItems || 'stretch'};
    justify-content: ${(props) => props.$justifyContent || 'flex-start'};
    gap: ${(props) => props.$gap};

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-column: ${(props) => props.$lgGridColumn};
        display: ${(props) => props.$lgDisplay};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: ${(props) => props.$mdDisplay};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        flex-direction: ${(props) => props.$smallFlexDir};
    }
`;

export const FormContainer = styled(FlexContainer).attrs({as: 'form'})``;
