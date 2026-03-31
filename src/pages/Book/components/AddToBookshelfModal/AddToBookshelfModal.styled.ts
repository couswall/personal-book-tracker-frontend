import styled from 'styled-components';
import {FlexContainer, IFlexContainerProps} from '@components/index';

interface IBookshelfOptionsContainerProps extends IFlexContainerProps {
    isSelected: boolean;
}

export const BookshelfOptionsContainer = styled(FlexContainer)<IBookshelfOptionsContainerProps>`
    padding: 1.25rem;
    border-radius: 1rem;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: ${({isSelected, theme}) =>
        isSelected ? theme.colors.containerHover.primary : theme.colors.background};

    &:hover {
        background-color: ${({isSelected, theme}) =>
            isSelected ? theme.colors.containerHover.primary : theme.colors.containerHover.muted};
    }
`;
