import {FlexContainer, LoadingSpinner} from '@components/index';
import {AppThemeProvider} from '@views/AppThemeProvider';

export const AuthLoadingScreen = () => (
    <AppThemeProvider>
        <FlexContainer $minHeight="100vh" $alignItems="center" $justifyContent="center">
            <LoadingSpinner />
        </FlexContainer>
    </AppThemeProvider>
);
