import styled, {css, keyframes} from 'styled-components';
import {ButtonProps, getVariantStyles, getSizeStyles} from '@components/Button/buttonVariants';

export const StyledButton = styled.button<ButtonProps>`
    display: ${(props) => props.Display ?? 'flex'};
    align-items: ${(props) => props.AlignItems ?? 'center'};
    justify-content: ${(props) => props.JustifyContent ?? 'center'};
    font-family: ${(props) => props.FontFamily ?? props.theme.fonts.lexend};
    font-weight: ${(props) => props.FontWeight ?? '500'};
    cursor: pointer;
    text-decoration: ${(props) => props.TextDecoration ?? 'none'};
    outline: ${(props) => props.Outline ?? 'none'};
    transition: all 0.2s ease;
    flex: ${(props) => props.Flex};
    max-width: ${(props) => props.MaxWidth};
    margin: ${(props) => props.Margin};
    margin-top: ${(props) => props.MarginTop};
    gap: ${(props) => props.Gap};

    /* Apply size styles */
    ${(props) => getSizeStyles(props.size ?? 'md')}

    /* Apply variant styles */
    ${(props) => getVariantStyles(props.variant ?? 'primary', props.theme)}

    /* Width handling */
    width: ${(props) => {
        if (props.Width) return props.Width;
        if (props.fullWidth) return '100%';
        return 'auto';
    }};

    /* Override with custom props if provided */
    ${(props) =>
        props.BackGroundColor &&
        css`
            background-color: ${props.BackGroundColor};
        `}
    ${(props) =>
        props.FontColor &&
        css`
            color: ${props.FontColor};
        `}
    ${(props) =>
        props.Height &&
        css`
            height: ${props.Height};
        `}
    ${(props) =>
        props.Padding &&
        css`
            padding: ${props.Padding};
        `}
    ${(props) =>
        props.Border &&
        css`
            border: ${props.Border};
        `}
    ${(props) =>
        props.BorderRadius &&
        css`
            border-radius: ${props.BorderRadius};
        `}
    ${(props) =>
        props.FontSize &&
        css`
            font-size: ${props.FontSize};
        `}

    &:hover {
        text-decoration: ${(props) => props.HTextDecoration ?? 'none'};
        ${(props) =>
            props.HBackGColor &&
            css`
                background-color: ${props.HBackGColor};
            `}
    }

    &:disabled {
        background-color: ${(props) => props.DisabledBackGC ?? props.theme.colors.disabledButton};
        color: ${(props) => props.DisabledFontColor ?? props.theme.colors.darkGrey};
        cursor: not-allowed;
        opacity: 0.6;
    }

    &:focus-visible {
        outline: 2px solid ${(props) => props.theme.colors.primaryColor};
        outline-offset: 2px;
    }

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        display: ${(props) => props.LgDisplay};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: ${(props) => props.MdDisplay};
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
