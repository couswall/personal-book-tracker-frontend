import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router';
import {useRef, useState} from 'react';
import {AppDispatch, RootState} from '@store/store';
import {useClickOutside} from '@components/Navbar/hooks/useClickOutside';
import {FlexContainer, MutedIcon, Image, ButtonGhost} from '@components/index';
import {SubMenuNav} from '@components/Navbar/components/index';
import {SearchingNavbar} from '@components/Navbar/components/SearchingNavbar/SearchingNavbar';
import {toggleDarkMode} from '@store/index';
import robotImg from '/assets/avatar-robot.jpg';
import {privateRoutes} from '@routes/routes';

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
                    <ButtonGhost
                        Padding="0.5rem 0.75rem"
                        BorderRadius="1rem"
                        Width="36px"
                        onClick={() => navigate(privateRoutes.search)}
                        Display="none"
                        MdDisplay="flex"
                    >
                        <MutedIcon className="fa-solid fa-magnifying-glass" size="md" />
                    </ButtonGhost>
                </>
            )}

            <ButtonGhost
                Padding="0.5rem 0.75rem"
                BorderRadius="1rem"
                Width="36px"
                onClick={() => dispatch(toggleDarkMode())}
            >
                <MutedIcon
                    className={isDarkMode ? 'fa-regular fa-sun' : 'fa-solid fa-moon'}
                    size="md"
                />
            </ButtonGhost>
            <FlexContainer Position="relative" BackgroundColor="inherit">
                <ButtonGhost
                    ref={triggerRef}
                    BorderRadius="1rem"
                    Gap="0.5rem"
                    AlignItems="center"
                    Padding="0.25rem"
                    onClick={() => setShowSubNav(!showSubNav)}
                >
                    <FlexContainer Height="32px" Width="32px" BorderRadius="50%" Overflow="hidden">
                        <Image src={robotImg} ObjectFit="cover" />
                    </FlexContainer>
                    <MutedIcon className="fa-solid fa-angle-down" size="md" />
                </ButtonGhost>
                <SubMenuNav isVisible={showSubNav} subMenuRef={subMenuRef} />
            </FlexContainer>
        </FlexContainer>
    );
};
