import styled, {css, DefaultTheme} from 'styled-components';

type TypographyVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'muted'
    | 'white'
    | 'error'
    | 'success'
    | 'danger';
type TypographySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

interface ITypographyBaseProps {
    variant?: TypographyVariant;
    size?: TypographySize;
    weight?: TypographyWeight;
    FontSize?: string;
    FontWeight?: string;
    FontColor?: string;
    FontFamily?: string;
    FontStyle?: string;
    LineHeight?: string;
    TextAlign?: string;
    Margin?: string;
    Padding?: string;
    Cursor?: string;
    TextDecoration?: string;
    Width?: string;
    LetterSpacing?: string;
    Border?: string;
    BorderRadius?: string;
    BackgroundColor?: string;
    WhiteSpace?: string;
    TextOverflow?: string;
    Overflow?: string;
    HTextDecoration?: string;
    SmDisplay?: string;
}

const getVariantStyles = (variant: TypographyVariant, theme: DefaultTheme) => {
    const variants = {
        default: css`
            color: ${theme.colors.text.theme};
        `,
        primary: css`
            color: ${theme.colors.primaryColor};
        `,
        secondary: css`
            color: ${theme.colors.secondaryColor};
        `,
        accent: css`
            color: ${theme.colors.text.accent};
        `,
        muted: css`
            color: ${theme.colors.text.light};
        `,
        white: css`
            color: ${theme.colors.lightColor};
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

const getSizeStyles = (size: TypographySize, theme: DefaultTheme) => {
    const sizeConfig = theme.typography.sizes[size];
    return css`
        font-size: ${sizeConfig.fontSize};
        line-height: ${sizeConfig.lineHeight};
    `;
};

const getWeightStyles = (weight: TypographyWeight, theme: DefaultTheme) => {
    return css`
        font-weight: ${theme.typography.weights[weight]};
    `;
};

export const Text = styled.p<ITypographyBaseProps>`
    font-family: ${(props) => props.FontFamily || props.theme.fonts.lexend};
    font-style: ${(props) => props.FontStyle || 'normal'};
    text-align: ${(props) => props.TextAlign || 'left'};
    margin: ${(props) => props.Margin || '0'};
    padding: ${(props) => props.Padding || '0'};
    cursor: ${(props) => props.Cursor};
    text-decoration: ${(props) => props.TextDecoration};
    width: ${(props) => props.Width};
    letter-spacing: ${(props) => props.LetterSpacing};
    border: ${(props) => props.Border};
    border-radius: ${(props) => props.BorderRadius};
    background-color: ${(props) => props.BackgroundColor};
    white-space: ${(props) => props.WhiteSpace};
    text-overflow: ${(props) => props.TextOverflow};
    overflow: ${(props) => props.Overflow};
    transition: color 0.2s ease;

    /* Apply size styles */
    ${(props) => getSizeStyles(props.size || 'md', props.theme)}

    /* Apply weight styles */
    ${(props) => getWeightStyles(props.weight || 'normal', props.theme)}

    /* Apply variant styles */
    ${(props) => getVariantStyles(props.variant || 'default', props.theme)}

    /* Override with custom props if provided */
    ${(props) =>
        props.FontSize &&
        css`
            font-size: ${props.FontSize};
        `}
    ${(props) =>
        props.FontWeight &&
        css`
            font-weight: ${props.FontWeight};
        `}
    ${(props) =>
        props.FontColor &&
        css`
            color: ${props.FontColor};
        `}
    ${(props) =>
        props.LineHeight &&
        css`
            line-height: ${props.LineHeight};
        `}

    &:hover {
        text-decoration: ${(props) => props.HTextDecoration};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        display: ${(props) => props.SmDisplay};
    }
`;

export const TitleH1 = styled(Text).attrs({as: 'h1', size: '4xl', weight: 'bold'})``;
export const TitleH2 = styled(Text).attrs({as: 'h2', size: '3xl', weight: 'bold'})``;
export const TitleH3 = styled(Text).attrs({as: 'h3', size: '2xl', weight: 'bold'})``;
export const TitleH4 = styled(Text).attrs({as: 'h4', size: 'xl', weight: 'bold'})``;
export const TitleH5 = styled(Text).attrs({as: 'h5', size: 'lg', weight: 'semibold'})``;
export const TitleH6 = styled(Text).attrs({as: 'h6', size: 'md', weight: 'semibold'})``;

export const Paragraph = styled(Text).attrs({size: 'md', weight: 'normal'})``;
export const Label = styled(Text).attrs({as: 'label', size: 'sm', weight: 'medium'})``;
export const Small = styled(Text).attrs({as: 'small', size: 'sm', weight: 'normal'})``;
export const Caption = styled(Text).attrs({
    as: 'span',
    size: 'xs',
    weight: 'normal',
    variant: 'muted',
})``;
