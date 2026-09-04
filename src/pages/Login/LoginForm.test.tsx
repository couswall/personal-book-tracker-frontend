import {describe, expect, it} from 'vitest';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {LoginForm} from '@pages/Login/LoginForm';
import {LOGIN_PAGE, ERROR_MESSAGES} from '@pages/Login/constants';
import {AuthStatus} from '@store/auth/interfaces';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';
import {server} from '@src/testUtils/mswServer';

const fillAndSubmit = async (emailOrUsername: string, password: string) => {
    const user = userEvent.setup();

    if (emailOrUsername) {
        await user.type(
            screen.getByPlaceholderText(LOGIN_PAGE.FIELDS.EMAIL_USERNAME.PLACEHOLDER),
            emailOrUsername
        );
    }
    if (password) {
        await user.type(
            screen.getByPlaceholderText(LOGIN_PAGE.FIELDS.PASSWORD.PLACEHOLDER),
            password
        );
    }

    await user.click(screen.getByRole('button', {name: LOGIN_PAGE.BTN_LOGIN}));
};

describe('LoginForm', () => {
    it('shows validation errors when submitted empty', async () => {
        renderWithProviders(<LoginForm />);

        await fillAndSubmit('', '');

        expect(await screen.findAllByText(ERROR_MESSAGES.REQUIRED)).toHaveLength(2);
    });

    it('rejects a password that does not meet the format rules', async () => {
        renderWithProviders(<LoginForm />);

        await fillAndSubmit('jane', 'weak');

        expect(await screen.findByText(ERROR_MESSAGES.PASSWORD.FORMAT)).toBeInTheDocument();
    });

    it('logs the user in and reaches the authenticated state on valid credentials', async () => {
        server.use(
            http.post(`${apiUrl}${urlWeb.login}`, () =>
                HttpResponse.json({
                    success: true,
                    message: '',
                    data: {
                        user: {
                            id: 1,
                            fullName: 'Jane Doe',
                            username: 'jane',
                            email: 'jane@test.com',
                        },
                        token: 'abc123',
                    },
                })
            )
        );

        const {store} = renderWithProviders(<LoginForm />);

        await fillAndSubmit('jane', 'Secret1!');

        await waitFor(() => expect(store.getState().auth.status).toBe(AuthStatus.Authenticated));
        expect(store.getState().auth.token).toBe('abc123');
    });

    it('shows the server error message on invalid credentials', async () => {
        server.use(
            http.post(`${apiUrl}${urlWeb.login}`, () =>
                HttpResponse.json(
                    {success: false, error: {message: 'Invalid credentials'}},
                    {status: 401}
                )
            )
        );

        renderWithProviders(<LoginForm />);

        await fillAndSubmit('jane', 'Secret1!');

        expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    });
});
