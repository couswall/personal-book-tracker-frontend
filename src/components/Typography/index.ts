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
    $fontSize?: string;
    $fontWeight?: string;
    $fontColor?: string;
    $fontFamily?: string;
    $fontStyle?: string;
    $lineHeight?: string;
    $textAlign?: string;
    $margin?: string;
    $padding?: string;
    $cursor?: string;
    $textDecoration?: string;
    $width?: string;
    $letterSpacing?: string;
    $border?: string;
    $borderRadius?: string;
    $backgroundColor?: string;
    $whiteSpace?: string;
    $textOverflow?: string;
    $overflow?: string;
    $hTextDecoration?: string;
    $smDisplay?: string;
    $marginTop?: string;
    $lgFontSize?: string;
    $textTransform?: string;
    $marginBottom?: string;
    $opacity?: string;
    $flexShrink?: string;
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
    font-family: ${(props) => props.$fontFamily || props.theme.fonts.lexend};
    font-style: ${(props) => props.$fontStyle || 'normal'};
    text-align: ${(props) => props.$textAlign || 'left'};
    margin: ${(props) => props.$margin || '0'};
    padding: ${(props) => props.$padding || '0'};
    cursor: ${(props) => props.$cursor};
    text-decoration: ${(props) => props.$textDecoration};
    width: ${(props) => props.$width};
    letter-spacing: ${(props) => props.$letterSpacing};
    border: ${(props) => props.$border};
    border-radius: ${(props) => props.$borderRadius};
    background-color: ${(props) => props.$backgroundColor};
    white-space: ${(props) => props.$whiteSpace};
    text-overflow: ${(props) => props.$textOverflow};
    overflow: ${(props) => props.$overflow};
    margin-top: ${(props) => props.$marginTop};
    margin-bottom: ${(props) => props.$marginBottom};
    text-transform: ${(props) => props.$textTransform};
    transition: color 0.2s ease;
    opacity: ${(props) => props.$opacity};
    flex-shrink: ${(props) => props.$flexShrink};

    /* Apply size styles */
    ${(props) => getSizeStyles(props.size || 'md', props.theme)}

    /* Apply weight styles */
    ${(props) => getWeightStyles(props.weight || 'normal', props.theme)}

    /* Apply variant styles */
    ${(props) => getVariantStyles(props.variant || 'default', props.theme)}

    /* Override with custom props if provided */
    ${(props) =>
        props.$fontSize &&
        css`
            font-size: ${props.$fontSize};
        `}
    ${(props) =>
        props.$fontWeight &&
        css`
            font-weight: ${props.$fontWeight};
        `}
    ${(props) =>
        props.$fontColor &&
        css`
            color: ${props.$fontColor};
        `}
    ${(props) =>
        props.$lineHeight &&
        css`
            line-height: ${props.$lineHeight};
        `}

    &:hover {
        text-decoration: ${(props) => props.$hTextDecoration};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        font-size: ${(props) => props.$lgFontSize};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        display: ${(props) => props.$smDisplay};
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
