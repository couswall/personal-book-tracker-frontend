import styled from 'styled-components';
import {FlexContainer, IFlexContainerProps} from '@components/FlexContainer/index';

export type IconWrapperShape = 'circle' | 'square';

interface IconWrapperProps extends IFlexContainerProps {
    isActive?: boolean;
    shape?: IconWrapperShape;
}

const SHAPE_RADIUS: Record<IconWrapperShape, string> = {
    circle: '50%',
    square: '0.5rem',
};

export const IconWrapper = styled(FlexContainer)<IconWrapperProps>`
    width: ${(props) => props.Width ?? '2.5rem'};
    height: ${(props) => props.Height ?? '2.5rem'};
    align-items: center;
    justify-content: center;
    border-radius: ${(props) => props.BorderRadius ?? SHAPE_RADIUS[props.shape ?? 'circle']};
    background-color: ${(props) =>
        (props.isActive ?? true)
            ? `${props.theme.colors.primaryColor}33`
            : 'rgba(255, 255, 255, 0.05)'};
    transition: background-color 0.2s ease;
`;
