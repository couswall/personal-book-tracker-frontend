import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {AppDispatch, RootState} from '@store/store';
import {SubMenuContainer} from '@components/Navbar/styles';
import {DangerIcon, Icon, ButtonGhost, Text, FlexContainer} from '@components/index';
import {onLogout} from '@store/index';
import {publicRoutes} from '@routes/routes';
import {SUB_MENU, subMenuRoutes} from '@components/Navbar/constants';
import {SubMenuNavProps} from '@components/Navbar/components/interfaces';

export const SubMenuNav = ({isVisible, subMenuRef}: SubMenuNavProps) => {
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const name = user.fullName.split(' ')[0];
    const onSignout = () => {
        dispatch(onLogout());
        navigate(publicRoutes.login);
    };
    return (
        <SubMenuContainer
            $isVisible={isVisible}
            BackgroundColorVariant="tertiary"
            BoxShadowVariant="md"
            Border="1px solid"
            ref={subMenuRef}
        >
            <FlexContainer
                Padding="0.5rem 1rem"
                FlexDirection="column"
                BackgroundColor="inherit"
                BorderBottom="1px solid"
                Cursor="default"
            >
                <Text variant="muted" size="xs">
                    {SUB_MENU.WELCOME_BACK}
                </Text>
                <Text size="md" weight="semibold">
                    {name}
                </Text>
            </FlexContainer>

            <FlexContainer
                FlexDirection="column"
                BackgroundColor="inherit"
                BorderBottom="1px solid"
                Padding="0.25rem 0px"
            >
                {subMenuRoutes.map((item, index) => (
                    <ButtonGhost
                        key={index}
                        Padding="0.5rem 1rem"
                        Gap="1rem"
                        JustifyContent="flex-start"
                        BorderRadius="unset"
                        onClick={() => navigate(item.route)}
                    >
                        <Icon variant="text" className={item.iconClassName} />
                        <Text FontSize="0.875rem" LetterSpacing="1px" Cursor="pointer">
                            {item.label}
                        </Text>
                    </ButtonGhost>
                ))}
            </FlexContainer>

            <ButtonGhost
                Margin="0.5rem 0px"
                Padding="0.5rem 1rem"
                BorderRadius="unset"
                Gap="1rem"
                JustifyContent="flex-start"
                onClick={onSignout}
            >
                <DangerIcon className="fa-solid fa-arrow-right-from-bracket" />
                <Text variant="danger" FontSize="0.875rem" LetterSpacing="1px" Cursor="pointer">
                    {SUB_MENU.LOGOUT}
                </Text>
            </ButtonGhost>
        </SubMenuContainer>
    );
};
