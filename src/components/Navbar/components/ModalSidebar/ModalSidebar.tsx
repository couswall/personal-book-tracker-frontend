import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router';
import React from 'react';
import {RootState} from '@store/store';
import {Modal, FlexContainer, LogoIcon, Icon, Image, Text} from '@components/index';
import {
    ModalSidebarContainer,
    NavSidebarItem,
} from '@components/Navbar/components/ModalSidebar/styles';
import robotImg from '/assets/avatar-robot.jpg';
import {LOGIN_PAGE} from '@pages/Login/login.constants';
import {NAVBAR_ARIA_LABELS, navbarRoutes} from '@components/Navbar/constants';
import {ModalSidebarProps} from '@components/Navbar/components/interfaces';

export const ModalSidebar: React.FC<ModalSidebarProps> = ({isMenuOpen, setIsMenuOpen}) => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {user} = useSelector((state: RootState) => state.auth);
    return (
        <Modal isOpen={isMenuOpen} onCloseModal={() => setIsMenuOpen(false)}>
            <ModalSidebarContainer backgroundColorVariant="secondary" $isVisible={isMenuOpen}>
                <FlexContainer
                    $padding="1.5rem"
                    $justifyContent="space-between"
                    $borderBottom="1px solid"
                    $alignItems="center"
                    $backgroundColor="inherit"
                >
                    <FlexContainer $gap="0.5rem" $alignItems="center" $backgroundColor="inherit">
                        <LogoIcon size="24px" />
                        <Text size="lg" weight="bold">
                            {LOGIN_PAGE.BOOK_TRACKER}
                        </Text>
                    </FlexContainer>
                    <Icon
                        variant="muted"
                        size="md"
                        className="fa-solid fa-x"
                        $cursor="pointer"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label={NAVBAR_ARIA_LABELS.CLOSE_NAVIGATION_MENU}
                    />
                </FlexContainer>

                <FlexContainer
                    $flexDirection="column"
                    $padding="1rem 0px"
                    $backgroundColor="inherit"
                    $height="100%"
                >
                    {navbarRoutes.map((item) => (
                        <NavSidebarItem
                            $isActive={pathname === item.route}
                            key={item.id}
                            size="sm"
                            $padding="1.5rem"
                            $gap="1rem"
                            $alignItems="center"
                            $justifyContent="flex-start"
                            $borderRadius="unset"
                            $height="unset"
                            onClick={() => navigate(item.route)}
                        >
                            <Icon
                                variant="muted"
                                size="sm"
                                className={item.iconClassName}
                                $cursor="pointer"
                            />
                            {item.label}
                        </NavSidebarItem>
                    ))}
                </FlexContainer>

                <FlexContainer
                    $padding="1.5rem"
                    $borderTop="1px solid"
                    $alignItems="center"
                    $backgroundColor="inherit"
                    $gap="1rem"
                >
                    <FlexContainer
                        $height="32px"
                        $width="32px"
                        $borderRadius="50%"
                        $overflow="hidden"
                    >
                        <Image src={robotImg} $objectFit="cover" alt="" />
                    </FlexContainer>
                    <FlexContainer
                        $backgroundColor="inherit"
                        $flexDirection="column"
                        $gap="0.25rem"
                    >
                        <Text size="md" weight="bold">
                            {user.fullName}
                        </Text>
                        <Text size="sm" variant="muted">
                            {`@${user.username}`}
                        </Text>
                    </FlexContainer>
                </FlexContainer>
            </ModalSidebarContainer>
        </Modal>
    );
};
