import {describe, expect, it} from 'vitest';
import {screen} from '@testing-library/react';
import {http, HttpResponse} from 'msw';
import {AppRouter} from '@routes/AppRouter';
import {LOGIN_PAGE} from '@pages/Login/login.constants';
import {HOME_TEXTS} from '@pages/Home/home.constants';
import {emptyDashboard} from '@pages/Home/home.fixtures';
import {authSlice} from '@store/auth/authSlice';
import {AuthStatus} from '@store/auth/interfaces';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';
import {server} from '@src/testUtils/mswServer';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';

describe('AppRouter', () => {
    it('redirects an unauthenticated user visiting a private route to login', () => {
        renderWithProviders(<AppRouter />, {
            route: '/mybooks',
            preloadedState: {
                auth: {...authSlice.getInitialState(), status: AuthStatus.NoAuthenticated},
            },
        });

        expect(screen.getByText(LOGIN_PAGE.TITLE)).toBeInTheDocument();
    });

    it('renders the private layout for an authenticated user', async () => {
        server.use(
            // AppRouter refreshes the token on mount; a failure other than 401 keeps the session.
            http.post(
                `${apiUrl}${urlWeb.refreshToken}`,
                () => new HttpResponse(null, {status: 500})
            ),
            http.get(`${apiUrl}${urlWeb.getDashboard}`, () =>
                HttpResponse.json({success: true, message: '', data: {dashboard: emptyDashboard}})
            )
        );

        renderWithProviders(<AppRouter />, {
            route: '/',
            preloadedState: {
                auth: {
                    ...authSlice.getInitialState(),
                    status: AuthStatus.Authenticated,
                    token: 'tok',
                },
            },
        });

        expect(
            await screen.findByRole(
                'heading',
                {name: HOME_TEXTS.CURRENTLY_READING_TITLE},
                {timeout: 10000}
            )
        ).toBeInTheDocument();
    }, 15000);
});
