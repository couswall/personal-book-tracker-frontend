import {css, DefaultTheme} from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    Width?: string;
    Height?: string;
    Margin?: string;
    MarginTop?: string;
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

export const getVariantStyles = (variant: ButtonVariant, theme: DefaultTheme) => {
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

export const getSizeStyles = (size: ButtonSize) => {
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
