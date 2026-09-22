import {describe, expect, it} from 'vitest';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    it('logs the user out and resets the session when Logout is clicked', async () => {
        const {store} = renderWithProviders(<Navbar />, {
            preloadedState: {auth: authenticatedState},
        });
        const user = userEvent.setup();

        await user.click(screen.getByRole('button', {name: NAVBAR_ARIA_LABELS.OPEN_ACCOUNT_MENU}));
        await user.click(screen.getByRole('button', {name: SUB_MENU.LOGOUT}));

        expect(store.getState().auth.status).toBe(AuthStatus.Checking);
        expect(store.getState().auth.token).toBe('');
    });
});
