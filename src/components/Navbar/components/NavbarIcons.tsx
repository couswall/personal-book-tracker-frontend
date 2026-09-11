import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router';
import {useRef, useState} from 'react';
import {AppDispatch, RootState} from '@store/store';
import {useClickOutside} from '@components/Navbar/hooks/useClickOutside';
import {FlexContainer, Icon, Image, Button} from '@components/index';
import {SubMenuNav} from '@components/Navbar/components/index';
import {SearchingNavbar} from '@components/Navbar/components/SearchingNavbar/SearchingNavbar';
import {toggleDarkMode} from '@store/index';
import robotImg from '/assets/avatar-robot.jpg';
import {privateRoutes} from '@routes/routes';
import {NAVBAR_ARIA_LABELS} from '@components/Navbar/constants';

export const NavbarIcons = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [showSubNav, setShowSubNav] = useState<boolean>(false);
    const {isDarkMode} = useSelector((state: RootState) => state.darkMode);
    const subMenuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    useClickOutside([subMenuRef, triggerRef], () => setShowSubNav(false));
    const isSearchPage = pathname === privateRoutes.search;

    return (
        <FlexContainer BackgroundColor="inherit" AlignItems="center" Gap="0.5rem">
            {!isSearchPage && (
                <>
                    <SearchingNavbar />
                    <Button
                        variant="ghost"
                        $padding="0.5rem 0.75rem"
                        $borderRadius="1rem"
                        $width="36px"
                        onClick={() => navigate(privateRoutes.search)}
                        $display="none"
                        $mdDisplay="flex"
                        aria-label={NAVBAR_ARIA_LABELS.SEARCH_BOOKS}
                    >
                        <Icon variant="muted" className="fa-solid fa-magnifying-glass" size="md" />
                    </Button>
                </>
            )}

            <Button
                variant="ghost"
                $padding="0.5rem 0.75rem"
                $borderRadius="1rem"
                $width="36px"
                onClick={() => dispatch(toggleDarkMode())}
                aria-label={
                    isDarkMode
                        ? NAVBAR_ARIA_LABELS.SWITCH_TO_LIGHT_MODE
                        : NAVBAR_ARIA_LABELS.SWITCH_TO_DARK_MODE
                }
            >
                <Icon
                    variant="muted"
                    className={isDarkMode ? 'fa-regular fa-sun' : 'fa-solid fa-moon'}
                    size="md"
                />
            </Button>
            <FlexContainer Position="relative" BackgroundColor="inherit">
                <Button
                    variant="ghost"
                    ref={triggerRef}
                    $borderRadius="1rem"
                    $gap="0.5rem"
                    $alignItems="center"
                    $padding="0.25rem"
                    onClick={() => setShowSubNav(!showSubNav)}
                    aria-label={NAVBAR_ARIA_LABELS.OPEN_ACCOUNT_MENU}
                >
                    <FlexContainer Height="32px" Width="32px" BorderRadius="50%" Overflow="hidden">
                        <Image src={robotImg} $objectFit="cover" alt="" />
                    </FlexContainer>
                    <Icon variant="muted" className="fa-solid fa-angle-down" size="md" />
                </Button>
                <SubMenuNav isVisible={showSubNav} subMenuRef={subMenuRef} />
            </FlexContainer>
        </FlexContainer>
    );
};
