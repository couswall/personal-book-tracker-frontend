import {RefObject} from 'react';

export interface SearchBarNavProps {
    showSearchInput: boolean;
    setShowSearchInput: React.Dispatch<React.SetStateAction<boolean>>;
    searchBarRef: RefObject<HTMLDivElement>;
}

export interface NavbarItemsProps extends SearchBarNavProps {}

export interface SubMenuNavProps {
    isVisible: boolean;
    subMenuRef: RefObject<HTMLDivElement>;
}

export interface ModalSidebarProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (value: boolean) => void;
}
