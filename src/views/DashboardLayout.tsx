import {Outlet} from 'react-router';
import {useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {RootState} from '@store/store';
import {FlexContainer, Navbar} from '@components/index';
import {darkTheme, lightTheme} from '@styles/Theme';

export const DashboardLayout = () => {
    const {isDarkMode} = useSelector((state: RootState) => state.darkMode);
    return (
        <>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <FlexContainer FlexDirection="column">
                    <Navbar />
                    <Outlet />
                </FlexContainer>
            </ThemeProvider>
        </>
    );
};
