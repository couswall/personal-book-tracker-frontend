import {useLocation, useNavigate} from 'react-router';
import React, {useRef} from 'react';
import {FlexContainer, TitleH1, LogoIcon} from '@components/index';
import {NavbarElement, NavbarLink, NavbarList} from '@components/Navbar/styles';
import {useClickOutside} from '@components/Navbar/hooks/useClickOutside';
import {navbarRoutes} from '@components/Navbar/constants';
import {NavbarItemsProps} from '@components/Navbar/components/interfaces';
import {LOGIN_PAGE} from '@pages/Login/constants';

export const NavbarItems: React.FC<NavbarItemsProps> = ({setShowSearchInput, searchBarRef}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const searchBtnRef = useRef<HTMLDivElement | null>(null);
    useClickOutside([searchBtnRef, searchBarRef], () => setShowSearchInput(false));

    return (
        <FlexContainer BackgroundColor="inherit" AlignItems="center" Gap="1.75rem">
            <FlexContainer
                BackgroundColor="inherit"
                AlignItems="center"
                Gap="0.5rem"
                Width="fit-content"
                Cursor="pointer"
                onClick={() => navigate('/')}
            >
                <LogoIcon size="31px" />
                <TitleH1 FontSize="1.25rem" FontWeight="700" SmDisplay="none">
                    {LOGIN_PAGE.BOOK_TRACKER}
                </TitleH1>
            </FlexContainer>
            <NavbarList>
                {navbarRoutes.map((item, index) => (
                    <NavbarElement key={index} onClick={() => navigate(item.route)}>
                        <NavbarLink
                            FontWeight="500"
                            FontSize="1rem"
                            variant={pathname === item.route ? 'accent' : 'muted'}
                        >
                            {item.label}
                        </NavbarLink>
                    </NavbarElement>
                ))}
            </NavbarList>
        </FlexContainer>
    );
};
