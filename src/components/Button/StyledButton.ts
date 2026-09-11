import styled, {css, keyframes} from 'styled-components';
import {ButtonProps, getVariantStyles, getSizeStyles} from '@components/Button/buttonVariants';

export const StyledButton = styled.button<ButtonProps>`
    display: ${(props) => props.$display ?? 'flex'};
    align-items: ${(props) => props.$alignItems ?? 'center'};
    justify-content: ${(props) => props.$justifyContent ?? 'center'};
    font-family: ${(props) => props.$fontFamily ?? props.theme.fonts.lexend};
    font-weight: ${(props) => props.$fontWeight ?? '500'};
    cursor: pointer;
    text-decoration: ${(props) => props.$textDecoration ?? 'none'};
    outline: ${(props) => props.$outline ?? 'none'};
    transition: all 0.2s ease;
    flex: ${(props) => props.$flex};
    max-width: ${(props) => props.$maxWidth};
    margin: ${(props) => props.$margin};
    margin-top: ${(props) => props.$marginTop};
    gap: ${(props) => props.$gap};

    /* Apply size styles */
    ${(props) => getSizeStyles(props.size ?? 'md')}

    /* Apply variant styles */
    ${(props) => getVariantStyles(props.variant ?? 'primary', props.theme)}

    /* Width handling */
    width: ${(props) => {
        if (props.$width) return props.$width;
        if (props.fullWidth) return '100%';
        return 'auto';
    }};

    /* Override with custom props if provided */
    ${(props) =>
        props.$backGroundColor &&
        css`
            background-color: ${props.$backGroundColor};
        `}
    ${(props) =>
        props.$fontColor &&
        css`
            color: ${props.$fontColor};
        `}
    ${(props) =>
        props.$height &&
        css`
            height: ${props.$height};
        `}
    ${(props) =>
        props.$padding &&
        css`
            padding: ${props.$padding};
        `}
    ${(props) =>
        props.$border &&
        css`
            border: ${props.$border};
        `}
    ${(props) =>
        props.$borderRadius &&
        css`
            border-radius: ${props.$borderRadius};
        `}
    ${(props) =>
        props.$fontSize &&
        css`
            font-size: ${props.$fontSize};
        `}

    &:hover {
        text-decoration: ${(props) => props.$hTextDecoration ?? 'none'};
        ${(props) =>
            props.$hBackGColor &&
            css`
                background-color: ${props.$hBackGColor};
            `}
    }

    &:disabled {
        background-color: ${(props) => props.$disabledBackGC ?? props.theme.colors.disabledButton};
        color: ${(props) => props.$disabledFontColor ?? props.theme.colors.darkGrey};
        cursor: not-allowed;
        opacity: 0.6;
    }

    &:focus-visible {
        outline: 2px solid ${(props) => props.theme.colors.primaryColor};
        outline-offset: 2px;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        display: ${(props) => props.$lgDisplay};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: ${(props) => props.$mdDisplay};
    }
`;

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

export const ButtonSpinner = styled.span`
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: ${spin} 0.6s linear infinite;
`;

export const ButtonContent = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
`;
