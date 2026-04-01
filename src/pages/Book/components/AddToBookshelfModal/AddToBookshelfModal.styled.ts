import styled, {keyframes} from 'styled-components';
import {FlexContainer, IFlexContainerProps} from '@components/index';

interface IBookshelfOptionsContainerProps extends IFlexContainerProps {
    isSelected: boolean;
    $isLoading?: boolean;
}

export const BookshelfOptionsContainer = styled(FlexContainer)<IBookshelfOptionsContainerProps>`
    padding: 1.25rem;
    border-radius: 1rem;
    justify-content: space-between;
    align-items: center;
    cursor: ${({$isLoading}) => ($isLoading ? 'default' : 'pointer')};
    pointer-events: ${({$isLoading}) => ($isLoading ? 'none' : 'auto')};
    opacity: ${({$isLoading}) => ($isLoading ? 0.5 : 1)};
    transition: opacity 0.15s ease;
    background-color: ${({isSelected, theme}) =>
        isSelected ? theme.colors.containerHover.primary : theme.colors.background};

    &:hover {
        background-color: ${({isSelected, theme}) =>
            isSelected ? theme.colors.containerHover.primary : theme.colors.containerHover.muted};
    }
`;

export const fadeSlide = keyframes`
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const AlertContainer = styled(FlexContainer)`
    animation: ${fadeSlide} 0.25s ease-out;
    pointer-events: none;
`;
