import {Outlet} from 'react-router';
import {FlexContainer, Navbar} from '@components/index';
import {AppThemeProvider} from '@views/AppThemeProvider';

export const DashboardLayout = () => (
    <AppThemeProvider>
        <FlexContainer $flexDirection="column">
            <Navbar />
            <Outlet />
        </FlexContainer>
    </AppThemeProvider>
);
