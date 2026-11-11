import styled from 'styled-components';
import {FlexContainer} from '@components/Layout/FlexContainer/index';

export type IconWrapperShape = 'circle' | 'square';

interface IconWrapperProps {
    isActive?: boolean;
    shape?: IconWrapperShape;
    $width?: string;
    $height?: string;
    $borderRadius?: string;
}

const SHAPE_RADIUS: Record<IconWrapperShape, string> = {
    circle: '50%',
    square: '0.5rem',
};

export const IconWrapper = styled(FlexContainer)<IconWrapperProps>`
    width: ${(props) => props.$width ?? '2.5rem'};
    height: ${(props) => props.$height ?? '2.5rem'};
    align-items: center;
    justify-content: center;
    border-radius: ${(props) => props.$borderRadius ?? SHAPE_RADIUS[props.shape ?? 'circle']};
    background-color: ${(props) =>
        (props.isActive ?? true)
            ? `${props.theme.colors.primaryColor}33`
            : 'rgba(255, 255, 255, 0.05)'};
    transition: background-color 0.2s ease;
`;
