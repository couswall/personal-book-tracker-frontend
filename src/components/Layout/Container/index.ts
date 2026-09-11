import styled from 'styled-components';
import {BaseContainer} from '@components/Layout/BaseContainer/index';

type MaxWidthVariant = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';

interface ContainerProps {
    maxWidthVariant?: MaxWidthVariant;
}

export const Container = styled(BaseContainer)<ContainerProps>`
    width: 100%;
    max-width: ${(props) => {
        if (props.$maxWidth) return props.$maxWidth;
        return props.theme.widths.sectionMaxWidths[props.maxWidthVariant || 'xxl'];
    }};
    padding: ${(props) => props.$padding || props.theme.paddings.sectionContainer};
    margin: ${(props) => props.$margin || props.theme.margins.sectionContainer};
    background-color: ${(props) => props.$backgroundColor || 'transparent'};
`;
