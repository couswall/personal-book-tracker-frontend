import {ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {RootState} from '@store/store';
import {darkTheme, lightTheme} from '@styles/Theme';

export const AppThemeProvider = ({children}: {children: ReactNode}) => {
    const {isDarkMode} = useSelector((state: RootState) => state.darkMode);
    return <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{children}</ThemeProvider>;
};
