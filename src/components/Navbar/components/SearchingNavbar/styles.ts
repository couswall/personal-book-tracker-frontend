import styled from 'styled-components';
import {FlexContainer} from '@components/index';

export const SearchInputWrapper = styled(FlexContainer)<{hasError?: boolean}>`
    background-color: ${(props) =>
        props.BackgroundColor || props.theme.colors.input.inputBackground};
    border: 2px solid transparent;
    border-color: ${(props) => (props.hasError ? props.theme.colors.danger : 'transparent')};
    transition: border-color 0.2s ease-out;

    &:focus-within {
        border-color: ${(props) => props.theme.colors.primaryColor};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        cursor: pointer;
    }
`;
