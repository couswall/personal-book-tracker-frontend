import styled from 'styled-components';
import {FlexContainer, Icon, IconWrapper} from '@components/index';
import {EmptyStateIconTone} from '@pages/Home/components/EmptyState/emptyState.interfaces';

export const ToneIconWrapper = styled(IconWrapper)<{$tone: EmptyStateIconTone}>`
    background-color: ${({theme, $tone}) =>
        `${$tone === 'primary' ? theme.colors.primaryColor : theme.colors.secondaryColor}1A`};
    border: 1px solid
        ${({theme, $tone}) =>
            `${$tone === 'primary' ? theme.colors.primaryColor : theme.colors.secondaryColor}33`};
`;

export const ToneIcon = styled(Icon)<{$tone: EmptyStateIconTone}>`
    color: ${({theme, $tone}) =>
        $tone === 'primary' ? theme.colors.primaryColor : theme.colors.secondaryColor};
`;

export const RingedIconWrapper = styled(FlexContainer)`
    width: 10rem;
    height: 10rem;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px dashed ${({theme}) => theme.colors.primaryColor}4D;
    background-color: ${({theme}) => theme.colors.primaryColor}0D;
`;
