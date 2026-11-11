import {Outlet} from 'react-router';
import {FlexContainer} from '@components/index';
import {AppThemeProvider} from '@views/AppThemeProvider';

export const PublicLayout = () => (
    <AppThemeProvider>
        <FlexContainer $flexDirection="column" $backgroundColor="transparent">
            {/* TODO: Create Public Navbar */}
            <Outlet />
        </FlexContainer>
    </AppThemeProvider>
);
