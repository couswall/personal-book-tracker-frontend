import {describe, expect, it} from 'vitest';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {server} from '@src/testUtils/mswServer';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {Navbar} from '@components/Navbar/Navbar';
import {NAVBAR_ARIA_LABELS, SUB_MENU} from '@components/Navbar/constants';
import {LOGIN_PAGE} from '@pages/Login/login.constants';
import {authSlice} from '@store/auth/authSlice';
import {AuthStatus} from '@store/auth/interfaces';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';

const authenticatedState = {
    ...authSlice.getInitialState(),
    status: AuthStatus.Authenticated,
    token: 'abc123',
    user: {id: 1, fullName: 'Jane Doe', username: 'jane', email: 'jane@test.com'},
};

describe('Navbar', () => {
    it('renders the logo and the main nav links', () => {
        renderWithProviders(<Navbar />, {preloadedState: {auth: authenticatedState}});

        // The mobile drawer (ModalSidebar) only mounts once opened, so each
        // label renders once here, from the desktop nav.
        expect(screen.getAllByText(LOGIN_PAGE.BOOK_TRACKER).length).toBeGreaterThan(0);
        expect(screen.getAllByText('Home').length).toBe(1);
        expect(screen.getAllByText('My Books').length).toBe(1);
        expect(screen.getAllByText('Browse').length).toBe(1);
    });

    it("shows the signed-in user's first name in the account menu", async () => {
        renderWithProviders(<Navbar />, {preloadedState: {auth: authenticatedState}});
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: NAVBAR_ARIA_LABELS.OPEN_ACCOUNT_MENU}));

        expect(screen.getByText(SUB_MENU.WELCOME_BACK)).toBeInTheDocument();
        expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    it('calls the logout endpoint and clears the session when Logout is clicked', async () => {
        let logoutCalls = 0;
        server.use(
            http.post(`${apiUrl}${urlWeb.logout}`, () => {
                logoutCalls += 1;
                return HttpResponse.json({success: true, message: ''});
            })
        );
        const {store} = renderWithProviders(<Navbar />, {
            preloadedState: {auth: authenticatedState},
        });
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: NAVBAR_ARIA_LABELS.OPEN_ACCOUNT_MENU}));
        await user.click(screen.getByRole('button', {name: SUB_MENU.LOGOUT}));

        await waitFor(() => expect(store.getState().auth.status).toBe(AuthStatus.NoAuthenticated));
        expect(store.getState().auth.token).toBe('');
        expect(logoutCalls).toBe(1);
    });

    it('still clears the session when the logout request fails', async () => {
        server.use(
            http.post(`${apiUrl}${urlWeb.logout}`, () => new HttpResponse(null, {status: 500}))
        );
        const {store} = renderWithProviders(<Navbar />, {
            preloadedState: {auth: authenticatedState},
        });
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: NAVBAR_ARIA_LABELS.OPEN_ACCOUNT_MENU}));
        await user.click(screen.getByRole('button', {name: SUB_MENU.LOGOUT}));

        await waitFor(() => expect(store.getState().auth.status).toBe(AuthStatus.NoAuthenticated));
    });
});
