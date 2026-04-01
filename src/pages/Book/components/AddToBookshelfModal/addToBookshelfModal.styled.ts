import styled, {keyframes} from 'styled-components';
import {FlexContainer, IFlexContainerProps} from '@components/index';

interface IBookshelfOptionsContainerProps extends IFlexContainerProps {
    isSelected: boolean;
    $isLoading?: boolean;
}

export const BookshelfOptionsContainer = styled(FlexContainer)<IBookshelfOptionsContainerProps>`
    padding: 1rem;
    border-radius: 0.75rem;
    justify-content: space-between;
    align-items: center;
    cursor: ${({$isLoading}) => ($isLoading ? 'default' : 'pointer')};
    pointer-events: ${({$isLoading}) => ($isLoading ? 'none' : 'auto')};
    opacity: ${({$isLoading}) => ($isLoading ? 0.5 : 1)};
    transition:
        opacity 0.15s ease,
        background-color 0.2s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease;
    background-color: ${({isSelected, theme}) =>
        isSelected ? `${theme.colors.primaryColor}1A` : 'transparent'};
    border: 1px solid
        ${({isSelected, theme}) =>
            isSelected ? `${theme.colors.primaryColor}33` : 'rgba(255, 255, 255, 0.05)'};

    &:hover {
        background-color: ${({isSelected, theme}) =>
            isSelected ? `${theme.colors.primaryColor}1A` : 'rgba(255, 255, 255, 0.05)'};
        border-color: ${({isSelected, theme}) =>
            isSelected ? `${theme.colors.primaryColor}33` : theme.colors.primaryColor};
        box-shadow: ${({isSelected, theme}) =>
            isSelected ? 'none' : `0 0 15px ${theme.colors.primaryColor}26`};
    }
`;

interface IShelfIconWrapperProps extends IFlexContainerProps {
    isSelected: boolean;
}

export const ShelfIconWrapper = styled(FlexContainer)<IShelfIconWrapperProps>`
    width: 2.5rem;
    min-width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    align-items: center;
    justify-content: center;
    background-color: ${({isSelected, theme}) =>
        isSelected ? `${theme.colors.primaryColor}33` : 'rgba(255, 255, 255, 0.05)'};
    transition: background-color 0.2s ease;
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
