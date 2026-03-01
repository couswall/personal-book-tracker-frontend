import styled, {css, DefaultTheme} from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    Width?: string;
    Height?: string;
    Margin?: string;
    Padding?: string;
    BackGroundColor?: string;
    HBackGColor?: string;
    Border?: string;
    FontSize?: string;
    FontFamily?: string;
    FontWeight?: string;
    FontColor?: string;
    TextDecoration?: string;
    HTextDecoration?: string;
    BorderRadius?: string;
    Outline?: string;
    Cursor?: string;
    DisabledBackGC?: string;
    DisabledFontColor?: string;
    Flex?: string;
    MaxWidth?: string;
    Gap?: string;
    Display?: string;
    AlignItems?: string;
    JustifyContent?: string;
    LgDisplay?: string;
    MdDisplay?: string;
}

const getVariantStyles = (variant: ButtonVariant, theme: DefaultTheme) => {
    const isDarkMode = theme.mode === 'dark';
    const buttonTextColor = isDarkMode ? '#0F1B2A' : '#ffffff';

    const variants = {
        primary: css`
            background-color: ${theme.colors.primaryColor};
            color: ${buttonTextColor};
            border: none;

            &:hover:not(:disabled) {
                background-color: ${theme.colors.primaryHover};
            }
        `,
        secondary: css`
            background-color: ${theme.colors.secondaryColor};
            color: ${buttonTextColor};
            border: none;

            &:hover:not(:disabled) {
                background-color: ${theme.colors.secondaryColor}dd;
            }
        `,
        outline: css`
            background-color: transparent;
            color: ${theme.colors.primaryColor};
            border: 2px solid ${theme.colors.primaryColor};

            &:hover:not(:disabled) {
                background-color: ${theme.colors.primaryColor};
                color: ${buttonTextColor};
            }
        `,
        ghost: css`
            background-color: transparent;
            color: ${theme.colors.text.theme};
            border: none;

            &:hover:not(:disabled) {
                background-color: ${theme.colors.borderColor};
            }
        `,
        danger: css`
            background-color: ${theme.colors.danger};
            color: ${buttonTextColor};
            border: none;

            &:hover:not(:disabled) {
                background-color: ${theme.colors.dangerHover};
            }
        `,
        success: css`
            background-color: ${theme.colors.success};
            color: ${buttonTextColor};
            border: none;

            &:hover:not(:disabled) {
                background-color: ${theme.colors.successHover};
            }
        `,
    };

    return variants[variant];
};

const getSizeStyles = (size: ButtonSize) => {
    const sizes = {
        sm: css`
            height: 36px;
            padding: 0 12px;
            font-size: 0.875rem;
            border-radius: 0.5rem;
        `,
        md: css`
            height: 44px;
            padding: 0 16px;
            font-size: 1rem;
            border-radius: 0.75rem;
        `,
        lg: css`
            height: 52px;
            padding: 0 24px;
            font-size: 1.125rem;
            border-radius: 1rem;
        `,
    };

    return sizes[size];
};

export const Button = styled.button<ButtonProps>`
    display: ${(props) => props.Display || 'flex'};
    align-items: ${(props) => props.AlignItems || 'center'};
    justify-content: ${(props) => props.JustifyContent || 'center'};
    font-family: ${(props) => props.FontFamily || props.theme.fonts.lexend};
    font-weight: ${(props) => props.FontWeight || '500'};
    cursor: pointer;
    text-decoration: ${(props) => props.TextDecoration || 'none'};
    outline: ${(props) => props.Outline || 'none'};
    transition: all 0.2s ease;
    flex: ${(props) => props.Flex};
    max-width: ${(props) => props.MaxWidth};
    margin: ${(props) => props.Margin};
    gap: ${(props) => props.Gap};

    /* Apply size styles */
    ${(props) => getSizeStyles(props.size || 'md')}

    /* Apply variant styles */
    ${(props) => getVariantStyles(props.variant || 'primary', props.theme)}

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
        text-decoration: ${(props) => props.HTextDecoration || 'none'};
        ${(props) =>
            props.HBackGColor &&
            css`
                background-color: ${props.HBackGColor};
            `}
    }

    &:disabled {
        background-color: ${(props) => props.DisabledBackGC || props.theme.colors.disabledButton};
        color: ${(props) => props.DisabledFontColor || props.theme.colors.darkGrey};
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

// Convenience exports for backwards compatibility
export const ButtonPrimary = styled(Button).attrs({variant: 'primary'})``;
export const ButtonSecondary = styled(Button).attrs({variant: 'secondary'})``;
export const ButtonOutline = styled(Button).attrs({variant: 'outline'})``;
export const ButtonGhost = styled(Button).attrs({variant: 'ghost'})``;
export const ButtonDanger = styled(Button).attrs({variant: 'danger'})``;
export const ButtonSuccess = styled(Button).attrs({variant: 'success'})``;
export const ButtonTransparent = styled(Button).attrs({variant: 'ghost'})``;
