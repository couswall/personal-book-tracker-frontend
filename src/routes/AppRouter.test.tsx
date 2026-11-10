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

const refreshFails = () =>
    http.post(`${apiUrl}${urlWeb.refreshToken}`, () =>
        HttpResponse.json(
            {success: false, error: {message: 'Invalid or expired token'}},
            {status: 401}
        )
    );

const refreshSucceeds = () =>
    http.post(`${apiUrl}${urlWeb.refreshToken}`, () =>
        HttpResponse.json({
            success: true,
            message: '',
            data: {
                user: {id: 1, fullName: 'Jane Doe', username: 'jane', email: 'jane@test.com'},
                token: 'new-access-token',
            },
        })
    );

const dashboardSucceeds = () =>
    http.get(`${apiUrl}${urlWeb.getDashboard}`, () =>
        HttpResponse.json({success: true, message: '', data: {dashboard: emptyDashboard}})
    );

describe('AppRouter', () => {
    it('redirects an unauthenticated user visiting a private route to login', () => {
        server.use(refreshFails());

        renderWithProviders(<AppRouter />, {
            route: '/mybooks',
            preloadedState: {
                auth: {...authSlice.getInitialState(), status: AuthStatus.NoAuthenticated},
            },
        });

        expect(screen.getByText(LOGIN_PAGE.TITLE)).toBeInTheDocument();
    });

    it('restores the session on startup when the refresh cookie is valid', async () => {
        server.use(refreshSucceeds(), dashboardSucceeds());

        // The default auth state is Checking, like a fresh page load.
        renderWithProviders(<AppRouter />, {route: '/'});

        expect(
            await screen.findByRole(
                'heading',
                {name: HOME_TEXTS.CURRENTLY_READING_TITLE},
                {timeout: 10000}
            )
        ).toBeInTheDocument();
    }, 15000);

    it('shows the login page on startup when the refresh cookie is missing or invalid', async () => {
        server.use(refreshFails());

        renderWithProviders(<AppRouter />, {route: '/'});

        expect(await screen.findByText(LOGIN_PAGE.TITLE)).toBeInTheDocument();
    });
});
