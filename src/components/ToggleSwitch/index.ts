import styled from 'styled-components';

export const ToggleSwitchWrapper = styled.label`
    position: relative;
    display: inline-block;
    width: 2.75rem;
    height: 1.5rem;
    flex-shrink: 0;
`;

export const ToggleSwitchInput = styled.input.attrs({type: 'checkbox'})`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

export const ToggleSwitchTrack = styled.span`
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    background-color: ${({theme}) => theme.colors.borderColor};
    cursor: pointer;
    transition: background-color 0.2s ease;

    &::after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background-color: ${({theme}) => theme.colors.lightColor};
        transition: transform 0.2s ease;
    }

    ${ToggleSwitchInput}:checked + & {
        background-color: ${({theme}) => theme.colors.primaryColor};

        &::after {
            transform: translateX(1.25rem);
        }
    }
`;
