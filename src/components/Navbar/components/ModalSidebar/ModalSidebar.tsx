import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router';
import React from 'react';
import {RootState} from '@store/store';
import {Modal, FlexContainer, LogoIcon, MutedIcon, Image, Text} from '@components/index';
import {
    ModalSidebarContainer,
    NavSidebarItem,
} from '@components/Navbar/components/ModalSidebar/styles';
import robotImg from '/assets/avatar-robot.jpg';
import {LOGIN_PAGE} from '@pages/Login/constants';
import {navbarRoutes} from '@components/Navbar/constants';
import {ModalSidebarProps} from '@components/Navbar/components/interfaces';

export const ModalSidebar: React.FC<ModalSidebarProps> = ({isMenuOpen, setIsMenuOpen}) => {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {user} = useSelector((state: RootState) => state.auth);
    return (
        <Modal isOpen={isMenuOpen} onCloseModal={() => setIsMenuOpen(false)}>
            <ModalSidebarContainer BackgroundColorVariant="secondary" $isVisible={isMenuOpen}>
                <FlexContainer
                    Padding="1.5rem"
                    JustifyContent="space-between"
                    BorderBottom="1px solid"
                    AlignItems="center"
                    BackgroundColor="inherit"
                >
                    <FlexContainer Gap="0.5rem" AlignItems="center" BackgroundColor="inherit">
                        <LogoIcon size="24px" />
                        <Text size="lg" weight="bold">
                            {LOGIN_PAGE.BOOK_TRACKER}
                        </Text>
                    </FlexContainer>
                    <MutedIcon
                        size="md"
                        className="fa-solid fa-x"
                        Cursor="pointer"
                        onClick={() => setIsMenuOpen(false)}
                    />
                </FlexContainer>

                <FlexContainer
                    FlexDirection="column"
                    Padding="1rem 0px"
                    BackgroundColor="inherit"
                    Height="100%"
                >
                    {navbarRoutes.map((item) => (
                        <NavSidebarItem
                            $isActive={pathname === item.route}
                            key={item.id}
                            size="sm"
                            Padding="1.5rem"
                            Gap="1rem"
                            AlignItems="center"
                            JustifyContent="flex-start"
                            BorderRadius="unset"
                            Height="unset"
                            onClick={() => navigate(item.route)}
                        >
                            <MutedIcon size="sm" className={item.iconClassName} Cursor="pointer" />
                            {item.label}
                        </NavSidebarItem>
                    ))}
                </FlexContainer>

                <FlexContainer
                    Padding="1.5rem"
                    BorderTop="1px solid"
                    AlignItems="center"
                    BackgroundColor="inherit"
                    Gap="1rem"
                >
                    <FlexContainer Height="32px" Width="32px" BorderRadius="50%" Overflow="hidden">
                        <Image src={robotImg} ObjectFit="cover" />
                    </FlexContainer>
                    <FlexContainer BackgroundColor="inherit" FlexDirection="column" Gap="0.25rem">
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
