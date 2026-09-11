import styled from 'styled-components';

type BoxShadowVariant = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'inner';

export type ThemeContainerBGColorVariants = {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    card: string;
};

export type ThemeContainerHBGColorVariants = {
    primary: string;
    muted: string;
};

export type ThemeContainerHBorderColorVariants = {
    primary: string;
    muted: string;
};

export interface IBaseContainerProps {
    $width?: string;
    $maxWidth?: string;
    $height?: string;
    $minHeight?: string;
    $maxHeight?: string;
    $padding?: string;
    $margin?: string;
    $marginBottom?: string;
    $background?: string;
    $backgroundColor?: string;
    backgroundColorVariant?: keyof ThemeContainerBGColorVariants;
    $border?: string;
    $borderBottom?: string;
    $borderRadius?: string;
    $display?: string;
    $alignItems?: string;
    $justifyContent?: string;
    $gap?: string;
    $boxShadow?: string;
    boxShadowVariant?: BoxShadowVariant;
    $marginTop?: string;
    $cursor?: string;
    $position?: string;
    $top?: string;
    $right?: string;
    $bottom?: string;
    $left?: string;
    $borderTop?: string;
    $lgDisplay?: string;
    $lgWidth?: string;
    $lgGridColumn?: string;
    $lgPadding?: string;
    $mdWidth?: string;
    $mdDisplay?: string;
    $smallPadding?: string;
    $smallFlexDir?: string;
    $smallWidth?: string;
    $smallHeight?: string;
    hasError?: boolean;
    $overflow?: string;
    $filter?: string;
    hBackgroundColorVariant?: keyof ThemeContainerHBGColorVariants;
    $zIndex?: string;
    $gridColumn?: string;
    $paddingTop?: string;
    $overflowY?: string;
    hBorderColorVariant?: keyof ThemeContainerHBorderColorVariants;
}

const boxShadowMap: Record<BoxShadowVariant, string> = {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
};

export const BaseContainer = styled.div<IBaseContainerProps>`
    width: ${(props) => props.$width};
    height: ${(props) => props.$height};
    max-width: ${(props) => props.$maxWidth};
    min-height: ${(props) => props.$minHeight};
    max-height: ${(props) => props.$maxHeight};
    padding: ${(props) => props.$padding || '0'};
    margin: ${(props) => props.$margin || '0'};
    margin-bottom: ${(props) => props.$marginBottom};
    background: ${(props) => props.$background || 'none'};
    background-color: ${(props) => {
        const colorMap: ThemeContainerBGColorVariants = {
            primary: props.theme.colors.background,
            secondary: props.theme.colors.backgroundSecondary,
            tertiary: props.theme.colors.backgroundTertiary,
            accent: props.theme.colors.primaryLight,
            card: props.theme.colors.backgroundSecondary,
        };
        return props.$backgroundColor || colorMap[props.backgroundColorVariant || 'primary'];
    }};
    border: ${(props) => props.$border};
    border-bottom: ${(props) => props.$borderBottom};
    border-top: ${(props) => props.$borderTop};
    border-radius: ${(props) => props.$borderRadius || '0'};
    border-color: ${(props) => props.theme.colors.borderColor};
    display: ${(props) => props.$display};
    align-items: ${(props) => props.$alignItems};
    justify-content: ${(props) => props.$justifyContent};
    gap: ${(props) => props.$gap};
    box-sizing: border-box;
    box-shadow: ${(props) =>
        props.$boxShadow || (props.boxShadowVariant && boxShadowMap[props.boxShadowVariant])};
    margin-top: ${(props) => props.$marginTop};
    cursor: ${(props) => props.$cursor};
    position: ${(props) => props.$position};
    top: ${(props) => props.$top};
    bottom: ${(props) => props.$bottom};
    left: ${(props) => props.$left};
    right: ${(props) => props.$right};
    overflow: ${(props) => props.$overflow || 'unset'};
    overflow-y: ${(props) => props.$overflowY};
    filter: ${(props) => props.$filter};
    z-index: ${(props) => props.$zIndex};
    grid-column: ${(props) => props.$gridColumn};
    padding-top: ${(props) => props.$paddingTop};

    &:hover {
        background-color: ${(props) => {
            const colorMap: ThemeContainerHBGColorVariants = {
                primary: props.theme.colors.containerHover.primary,
                muted: props.theme.colors.containerHover.muted,
            };
            return props.hBackgroundColorVariant && colorMap[props.hBackgroundColorVariant];
        }};
        border-color: ${(props) => {
            const colorMap: ThemeContainerHBorderColorVariants = {
                primary: props.theme.colors.containerHover.primary,
                muted: props.theme.colors.containerHover.muted,
            };
            return props.hBorderColorVariant && colorMap[props.hBorderColorVariant];
        }};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        display: ${(props) => props.$lgDisplay};
        width: ${(props) => props.$lgWidth};
        grid-column: ${(props) => props.$lgGridColumn};
        padding: ${(props) => props.$lgPadding};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        display: ${(props) => props.$mdDisplay};
        width: ${(props) => props.$mdWidth};
    }

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        padding: ${(props) => props.$smallPadding};
        width: ${(props) => props.$smallWidth};
        height: ${(props) => props.$smallHeight};
    }
`;
