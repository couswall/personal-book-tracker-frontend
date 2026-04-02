import styled, {css} from 'styled-components';
import {ButtonProps, getVariantStyles, getSizeStyles} from '@components/Button/buttonVariants';

export type {ButtonProps} from '@components/Button/buttonVariants';

export const Button = styled.button<ButtonProps>`
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

export const ButtonPrimary = styled(Button).attrs({variant: 'primary'})``;
export const ButtonSecondary = styled(Button).attrs({variant: 'secondary'})``;
export const ButtonOutline = styled(Button).attrs({variant: 'outline'})``;
export const ButtonGhost = styled(Button).attrs({variant: 'ghost'})``;
export const ButtonDanger = styled(Button).attrs({variant: 'danger'})``;
export const ButtonSuccess = styled(Button).attrs({variant: 'success'})``;
export const ButtonTransparent = styled(Button).attrs({variant: 'ghost'})``;
