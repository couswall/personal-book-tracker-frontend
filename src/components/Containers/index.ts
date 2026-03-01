import styled from 'styled-components';
import {BaseContainer} from '@components/FlexContainer/index';

type MaxWidthVariant = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'full';

interface ContainerProps {
    MaxWidthVariant?: MaxWidthVariant;
}

export const Container = styled(BaseContainer)<ContainerProps>`
    width: 100%;
    max-width: ${(props) => {
        if (props.MaxWidth) return props.MaxWidth;
        return props.theme.widths.sectionMaxWidths[props.MaxWidthVariant || 'xxl'];
    }};
    padding: ${(props) => props.Padding || props.theme.paddings.sectionContainer};
    margin: ${(props) => props.Margin || props.theme.margins.sectionContainer};
    background-color: ${(props) => props.BackgroundColor || 'transparent'};
`;
