import {describe, expect, it} from 'vitest';
import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {SignUpForm} from '@pages/SignUp/components/SignUpForm';
import {ERROR_MESSAGES, SIGN_UP, SIGNUP_FORM} from '@pages/SignUp/signUp.constants';
import {AuthStatus} from '@store/auth/interfaces';
import {apiUrl, urlWeb} from '@constants/apiEndpoints';
import {renderWithProviders} from '@src/testUtils/renderWithProviders';
import {server} from '@src/testUtils/mswServer';

const validUser = {
    fullName: 'Jane Doe',
    username: 'jane.doe',
    email: 'jane@test.com',
    password: 'Secret1!',
};

const fillAndSubmit = async (overrides: Partial<typeof validUser> = {}) => {
    const user = userEvent.setup();
    const values = {...validUser, ...overrides};

    if (values.fullName) {
        await user.type(
            screen.getByPlaceholderText(SIGNUP_FORM.FULL_NAME.PLACEHOLDER),
            values.fullName
        );
    }
    if (values.username) {
        await user.type(
            screen.getByPlaceholderText(SIGNUP_FORM.USERNAME.PLACEHOLDER),
            values.username
        );
    }
    if (values.email) {
        await user.type(screen.getByPlaceholderText(SIGNUP_FORM.EMAIL.PLACEHOLDER), values.email);
    }
    if (values.password) {
        await user.type(
            screen.getByPlaceholderText(SIGNUP_FORM.PASSWORD.PLACEHOLDER),
            values.password
        );
    }

    await user.click(screen.getByRole('button', {name: SIGN_UP.BTN_SUBMIT}));
};

describe('SignUpForm', () => {
    it('shows validation errors when submitted empty', async () => {
        renderWithProviders(<SignUpForm />);

        await fillAndSubmit({fullName: '', username: '', email: '', password: ''});

        expect(await screen.findAllByText(ERROR_MESSAGES.REQUIRED_FIELD)).toHaveLength(4);
    });

    it('rejects an invalid email address', async () => {
        renderWithProviders(<SignUpForm />);

        await fillAndSubmit({email: 'not-an-email'});

        expect(await screen.findByText(ERROR_MESSAGES.EMAIL.FORMAT)).toBeInTheDocument();
    });

    it('registers the user and reaches the authenticated state on valid input', async () => {
        server.use(
            http.post(`${apiUrl}${urlWeb.registerUser}`, () =>
                HttpResponse.json({
                    success: true,
                    message: '',
                    data: {
                        user: {id: 1, ...validUser},
                        token: 'abc123',
                    },
                })
            )
        );

        const {store} = renderWithProviders(<SignUpForm />);

        await fillAndSubmit();

        await waitFor(() => expect(store.getState().auth.status).toBe(AuthStatus.Authenticated));
        expect(store.getState().auth.token).toBe('abc123');
    });

    it('shows the server error message when the username is taken', async () => {
        server.use(
            http.post(`${apiUrl}${urlWeb.registerUser}`, () =>
                HttpResponse.json(
                    {success: false, error: {message: 'Username already taken'}},
                    {status: 409}
                )
            )
        );

        renderWithProviders(<SignUpForm />);

        await fillAndSubmit();

        expect(await screen.findByText('Username already taken')).toBeInTheDocument();
    });
});
