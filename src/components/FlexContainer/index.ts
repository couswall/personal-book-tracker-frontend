import styled from 'styled-components';

type BoxShadowVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'inner';

interface IBaseContainerProps {
    Width?: string;
    MaxWidth?: string;
    Height?: string;
    MinHeight?: string;
    MaxHeight?: string;
    Padding?: string;
    Margin?: string;
    MarginBottom?: string;
    Background?: string;
    BackgroundColor?: string;
    BackgroundColorVariant?: keyof ThemeContainerBGColorVariants;
    Border?: string;
    BorderBottom?: string;
    BorderRadius?: string;
    Display?: string;
    AlignItems?: string;
    JustifyContent?: string;
    Gap?: string;
    BoxShadow?: string;
    BoxShadowVariant?: BoxShadowVariant;
    MarginTop?: string;
    Cursor?: string;
    Position?: string;
    Top?: string;
    Right?: string;
    Bottom?: string;
    Left?: string;
    BorderTop?: string;
    LgDisplay?: string;
    LgWidth?: string;
    MdWidth?: string;
    MdDisplay?: string;
    SmallPadding?: string;
    SmallFlexDir?: string;
    SmallWidth?: string;
    hasError?: boolean;
    Overflow?: string;
    Filter?: string;
    HBackgroundColorVariant?: keyof ThemeContainerHBGColorVariants;
    ZIndex?: string;
}

export interface IFlexContainerProps extends IBaseContainerProps {
    FlexWrap?: string;
    FlexDirection?: string;
    Flex?: string;
}

type ThemeContainerBGColorVariants = {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    card: string;
};

type ThemeContainerHBGColorVariants = {
    primary: string;
    muted: string;
};

const boxShadowMap: Record<BoxShadowVariant, string> = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
};

export const BaseContainer = styled.div<IBaseContainerProps>`
    width: ${(props) => props.Width};
    height: ${(props) => props.Height};
    max-width: ${(props) => props.MaxWidth};
    min-height: ${(props) => props.MinHeight};
    max-height: ${(props) => props.MaxHeight};
    padding: ${(props) => props.Padding || '0'};
    margin: ${(props) => props.Margin || '0'};
    margin-bottom: ${(props) => props.MarginBottom};
    background: ${(props) => props.Background || 'none'};
    background-color: ${(props) => {
        const colorMap: ThemeContainerBGColorVariants = {
            primary: props.theme.colors.background,
            secondary: props.theme.colors.backgroundSecondary,
            tertiary: props.theme.colors.backgroundTertiary,
            accent: props.theme.colors.primaryLight,
            card: props.theme.colors.backgroundSecondary,
        };
        return props.BackgroundColor || colorMap[props.BackgroundColorVariant || 'primary'];
    }};
    border: ${(props) => props.Border};
    border-bottom: ${(props) => props.BorderBottom};
    border-top: ${(props) => props.BorderTop};
    border-radius: ${(props) => props.BorderRadius || '0'};
    border-color: ${(props) => props.theme.colors.borderColor};
    display: ${(props) => props.Display};
    align-items: ${(props) => props.AlignItems};
    justify-content: ${(props) => props.JustifyContent};
    gap: ${(props) => props.Gap};
    box-sizing: border-box;
    box-shadow: ${(props) =>
        props.BoxShadow || (props.BoxShadowVariant && boxShadowMap[props.BoxShadowVariant])};
    margin-top: ${(props) => props.MarginTop};
    cursor: ${(props) => props.Cursor};
    position: ${(props) => props.Position};
    top: ${(props) => props.Top};
    bottom: ${(props) => props.Bottom};
    left: ${(props) => props.Left};
    right: ${(props) => props.Right};
    overflow: ${(props) => props.Overflow || 'unset'};
    filter: ${(props) => props.Filter};
    z-index: ${(props) => props.ZIndex};

    &:hover {
        background-color: ${(props) => {
            const colorMap: ThemeContainerHBGColorVariants = {
                primary: props.theme.colors.containerHover.primary,
                muted: props.theme.colors.containerHover.muted,
            };
            return props.HBackgroundColorVariant && colorMap[props.HBackgroundColorVariant];
        }};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        display: ${(props) => props.LgDisplay};
        width: ${(props) => props.LgWidth};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: ${(props) => props.MdDisplay};
        width: ${(props) => props.MdWidth};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: ${(props) => props.SmallPadding};
        width: ${(props) => props.SmallWidth};
    }
`;

export const FlexContainer = styled(BaseContainer)<IFlexContainerProps>`
    display: flex;
    flex-direction: ${(props) => props.FlexDirection || 'row'};
    flex-wrap: ${(props) => props.FlexWrap || 'nowrap'};
    flex: ${(props) => props.Flex || 'unset'};
    align-items: ${(props) => props.AlignItems || 'stretch'};
    justify-content: ${(props) => props.JustifyContent || 'flex-start'};
    gap: ${(props) => props.Gap};

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        display: ${(props) => props.LgDisplay};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: ${(props) => props.MdDisplay};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        flex-direction: ${(props) => props.SmallFlexDir};
    }
`;

export const FormContainer = styled(FlexContainer).attrs({as: 'form'})``;
