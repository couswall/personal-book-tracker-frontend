import styled, {css, DefaultTheme, keyframes} from 'styled-components';
import {FlexContainer, IFlexContainerProps, Text} from '@components/index';

interface IBookshelfOptionsContainerProps extends IFlexContainerProps {
    /** The shelf the book is on right now. */
    $isCurrent: boolean;
    /** The shelf the user just picked (being saved). */
    $isTarget: boolean;
    $isLoading?: boolean;
}

const optionStateStyles = ({
    $isCurrent,
    $isTarget,
    theme,
}: IBookshelfOptionsContainerProps & {theme: DefaultTheme}) => {
    if ($isTarget) {
        return css`
            background-color: ${theme.colors.primaryColor}1A;
            border-color: ${theme.colors.primaryColor}66;
        `;
    }
    if ($isCurrent) {
        return css`
            cursor: default;
            background-color: ${theme.colors.text.light}14;
            border-color: ${theme.colors.borderColor};
        `;
    }
    return css`
        &:hover {
            background-color: rgba(255, 255, 255, 0.05);
            border-color: ${theme.colors.primaryColor};
            box-shadow: 0 0 15px ${theme.colors.primaryColor}26;
        }
    `;
};

export const BookshelfOptionsContainer = styled(FlexContainer)<IBookshelfOptionsContainerProps>`
    padding: 1rem;
    border-radius: 0.75rem;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.05);
    pointer-events: ${({$isLoading}) => ($isLoading ? 'none' : 'auto')};
    opacity: ${({$isLoading, $isTarget}) => ($isLoading && !$isTarget ? 0.5 : 1)};
    transition:
        opacity 0.15s ease,
        background-color 0.2s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease;

    ${optionStateStyles}
`;

export const CurrentBadge = styled(Text).attrs({as: 'span', size: 'xs', weight: 'bold'})`
    font-size: 0.625rem;
    line-height: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0 0.5rem;
    border-radius: 0.25rem;
    color: ${({theme}) => theme.colors.text.light};
    background-color: ${({theme}) => theme.colors.containerHover.muted};
    border: 1px solid ${({theme}) => theme.colors.borderColor};
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
