import styled from 'styled-components';
import {Input, Text} from '@components/index';

export const ProgressInput = styled(Input)`
    border: none;
    border-bottom: 2px solid ${({theme}) => theme.colors.borderColor};
    border-radius: 0;
    background-color: transparent;
    font-size: 1.25rem;
    font-weight: 700;
    padding: 0.5rem 0;
    transition: border-color 0.2s ease;

    &:focus {
        border-bottom-color: ${({theme}) => theme.colors.primaryColor};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const InputSuffix = styled(Text)`
    position: absolute;
    right: 0;
    bottom: 0.75rem;
`;
