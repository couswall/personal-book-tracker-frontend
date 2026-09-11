import {useRef, useState} from 'react';
import {Container} from '@components/Containers';
import {FlexContainer, Button, Icon} from '@components/index';
import {NavbarStyled} from '@components/Navbar/styles';
import {NavbarItems, NavbarIcons} from '@components/Navbar/components';
import {ModalSidebar} from '@components/Navbar/components/ModalSidebar/ModalSidebar';
import {NAVBAR_ARIA_LABELS} from '@components/Navbar/constants';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement | null>(null);

    return (
        <NavbarStyled
            Height="80px"
            Width="100%"
            AlignItems="center"
            JustifyContent="space-between"
            Position="relative"
            BackgroundColorVariant="tertiary"
        >
            <Container Width="100%">
                <FlexContainer
                    BackgroundColor="inherit"
                    JustifyContent="space-between"
                    AlignItems="center"
                    Gap="16px"
                >
                    <Button
                        variant="ghost"
                        $padding="0.5rem 0.75rem"
                        $borderRadius="1rem"
                        $width="36px"
                        onClick={() => setIsMenuOpen(true)}
                        $display="none"
                        $lgDisplay="flex"
                        aria-label={NAVBAR_ARIA_LABELS.OPEN_NAVIGATION_MENU}
                    >
                        <Icon variant="muted" className="fa-solid fa-bars" size="md" />
                    </Button>
                    <NavbarItems
                        showSearchInput={showSearchInput}
                        setShowSearchInput={setShowSearchInput}
                        searchBarRef={searchBarRef}
                    />
                    <NavbarIcons />
                </FlexContainer>
            </Container>
            <ModalSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </NavbarStyled>
    );
};
