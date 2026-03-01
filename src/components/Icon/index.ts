import styled, {css, DefaultTheme} from 'styled-components';
import {BaseContainer} from '@components/FlexContainer/index';

type IconVariant = 'primary' | 'light' | 'dark' | 'muted' | 'error' | 'success' | 'danger' | 'text';
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface IconProps {
    variant?: IconVariant;
    size?: IconSize;
    FontColor?: string;
    FontSize?: string;
    Padding?: string;
    Margin?: string;
    MarginLeft?: string;
    Cursor?: string;
    Display?: string;
    LgDisplay?: string;
    SmDisplay?: string;
}

const getVariantStyles = (variant: IconVariant, theme: DefaultTheme) => {
    const variants = {
        primary: css`
            color: ${theme.colors.primaryColor};
        `,
        text: css`
            color: ${theme.colors.text.theme};
        `,
        light: css`
            color: ${theme.colors.lightColor};
        `,
        dark: css`
            color: ${theme.colors.darkGrey};
        `,
        muted: css`
            color: ${theme.colors.text.light};
        `,
        error: css`
            color: ${theme.colors.input.errorMsgText};
        `,
        success: css`
            color: ${theme.colors.success};
        `,
        danger: css`
            color: ${theme.colors.danger};
        `,
    };

    return variants[variant];
};

const getSizeStyles = (size: IconSize) => {
    const sizes = {
        xs: css`
            font-size: 0.625rem;
        `,
        sm: css`
            font-size: 0.875rem;
        `,
        md: css`
            font-size: 1rem;
        `,
        lg: css`
            font-size: 1.25rem;
        `,
        xl: css`
            font-size: 1.5rem;
        `,
    };

    return sizes[size];
};

export const Icon = styled.i<IconProps>`
    margin: ${(props) => props.Margin || '0'};
    margin-left: ${(props) => props.MarginLeft || '0'};
    padding: ${(props) => props.Padding || '0'};
    cursor: ${(props) => props.Cursor};
    display: ${(props) => props.Display};
    transition: color 0.2s ease;

    /* Apply size styles */
    ${(props) => getSizeStyles(props.size || 'sm')}

    /* Apply variant styles */
    ${(props) => getVariantStyles(props.variant || 'primary', props.theme)}

    /* Override with custom props if provided */
    ${(props) =>
        props.FontColor &&
        css`
            color: ${props.FontColor};
        `}
    ${(props) =>
        props.FontSize &&
        css`
            font-size: ${props.FontSize};
        `}

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        display: ${(props) => props.LgDisplay};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        display: ${(props) => props.SmDisplay};
    }
`;

// Convenience exports for backwards compatibility
export const LightIcon = styled(Icon).attrs({variant: 'light'})``;
export const DarkGreyIcon = styled(Icon).attrs({variant: 'dark'})``;
export const ErrorIcon = styled(Icon).attrs({variant: 'error'})``;
export const MutedIcon = styled(Icon).attrs({variant: 'muted'})``;
export const SuccessIcon = styled(Icon).attrs({variant: 'success'})``;
export const DangerIcon = styled(Icon).attrs({variant: 'danger'})``;

export const LighterIconWrapper = styled(BaseContainer)`
    background-color: ${(props) => props.theme.colors.backgroundSecondary};
`;
