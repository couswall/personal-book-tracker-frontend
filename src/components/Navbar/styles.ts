import styled from 'styled-components';
import {FlexContainer, TitleH4} from '@components/index';

export const NavbarStyled = styled(FlexContainer).attrs({as: 'nav'})`
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
`;

export const NavbarList = styled.ul`
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: inherit;
    gap: 1.5rem;

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        display: none;
    }
`;

export const NavbarElement = styled.li`
    list-style: none;
    background-color: inherit;
    cursor: pointer;

    @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
        display: flex;
    }
`;

export const NavbarLink = styled(TitleH4).attrs({as: 'p'})`
    transition: all 0.3s ease-out;

    &:hover {
        color: ${(props) => props.theme.colors.text.accent};
    }
`;

export const SearchBarContainer = styled(FlexContainer)`
    background-color: ${(props) => props.theme.colors.backgroundTertiary};

    padding: 0;
    height: 0;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease-out;

    &.expand-search-bar {
        padding: 1.5rem;
        height: max-content;
        opacity: 0.9;
        visibility: visible;
    }
`;

export const SubMenuContainer = styled(FlexContainer)<{$isVisible: boolean}>`
    position: absolute;
    width: 250px;
    flex-direction: column;
    top: 48px;
    right: 0;
    overflow: hidden;
    padding: 0.5rem 0px;
    border-radius: 0.75rem;
    gap: 0.25rem;

    opacity: ${(props) => (props.$isVisible ? 1 : 0)};
    visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
    transform: translateY(${(props) => (props.$isVisible ? '0' : '-10px')});
    transition:
        opacity 0.2s ease,
        transform 0.2s ease,
        visibility 0.2s ease;
    pointer-events: ${(props) => (props.$isVisible ? 'auto' : 'none')};
`;
