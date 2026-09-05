import {describe, expect, it} from 'vitest';
import {screen} from '@testing-library/react';
import {AppRouter} from '@routes/AppRouter';
import {LOGIN_PAGE} from '@pages/Login/login.constants';
import {authSlice} from '@store/auth/authSlice';
import {AuthStatus} from '@store/auth/interfaces';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';

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

    it('renders the private layout for an authenticated user', () => {
        renderWithProviders(<AppRouter />, {
            route: '/',
            preloadedState: {
                auth: {...authSlice.getInitialState(), status: AuthStatus.Authenticated},
            },
        });

        expect(screen.getByRole('heading', {name: 'HomePage'})).toBeInTheDocument();
    });
});
