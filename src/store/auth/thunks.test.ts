import {beforeEach, describe, expect, it, vi} from 'vitest';
import {loginUser, refreshToken, registerUser} from '@store/auth/thunks';
import {authSlice} from '@store/auth/authSlice';
import {AuthStatus} from '@store/auth/interfaces';
import {API_ERROR_MSGS} from '@constants/errorMessages';
import {urlWeb} from '@constants/apiEndpoints';
import {privateRoutes} from '@routes/routes';
import {createAuthClient} from '@api/httpClient';
import {IHttpClient} from '@api/api.interfaces';
import {createTestStore} from '@src/testUtils/renderWithProviders';

vi.mock('@api/httpClient', () => ({
    createAuthClient: vi.fn(),
}));

const mockedCreateAuthClient = vi.mocked(createAuthClient);

const buildClientMock = (overrides: Partial<IHttpClient>): IHttpClient => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    ...overrides,
});

const buildAuthStore = (authOverrides?: Partial<ReturnType<typeof authSlice.getInitialState>>) =>
    createTestStore({auth: {...authSlice.getInitialState(), ...authOverrides}});

const loginSuccessRes = {
    user: {id: 1, fullName: 'Jane Doe', username: 'jane', email: 'jane@test.com'},
    token: 'abc123',
};

beforeEach(() => {
    mockedCreateAuthClient.mockReset();
});

describe('loginUser', () => {
    it('navigates to home and stores the session on success', async () => {
        const navigate = vi.fn();
        const post = vi.fn().mockResolvedValue({success: true, message: '', data: loginSuccessRes});
        mockedCreateAuthClient.mockReturnValue(buildClientMock({post}));

        const store = buildAuthStore();
        await store.dispatch(
            loginUser({credentials: {emailOrUsername: 'jane', password: 'secret'}, navigate})
        );

        expect(navigate).toHaveBeenCalledWith(privateRoutes.home);
        expect(store.getState().auth.status).toBe(AuthStatus.Authenticated);
        expect(store.getState().auth.token).toBe('abc123');
    });

    it('stores the error message and does not navigate on failure', async () => {
        const navigate = vi.fn();
        const post = vi.fn().mockRejectedValue(new Error('Invalid credentials'));
        mockedCreateAuthClient.mockReturnValue(buildClientMock({post}));

        const store = buildAuthStore();
        await store.dispatch(
            loginUser({credentials: {emailOrUsername: 'jane', password: 'wrong'}, navigate})
        );

        expect(navigate).not.toHaveBeenCalled();
        expect(store.getState().auth.status).toBe(AuthStatus.NoAuthenticated);
        expect(store.getState().auth.errors.loginErrorMsg).toBe('Invalid credentials');
    });
});

describe('registerUser', () => {
    it('navigates to home and stores the session on success', async () => {
        const navigate = vi.fn();
        const post = vi.fn().mockResolvedValue({success: true, message: '', data: loginSuccessRes});
        mockedCreateAuthClient.mockReturnValue(buildClientMock({post}));

        const store = buildAuthStore();
        await store.dispatch(
            registerUser({
                newUser: {
                    fullName: 'Jane Doe',
                    username: 'jane',
                    email: 'jane@test.com',
                    password: 'Secret1!',
                },
                navigate,
            })
        );

        expect(navigate).toHaveBeenCalledWith(privateRoutes.home);
        expect(store.getState().auth.status).toBe(AuthStatus.Authenticated);
    });
});

describe('refreshToken', () => {
    it('calls the refresh endpoint without a body and stores the new session', async () => {
        const post = vi.fn().mockResolvedValue({success: true, message: '', data: loginSuccessRes});
        mockedCreateAuthClient.mockReturnValue(buildClientMock({post}));

        const store = buildAuthStore();
        await store.dispatch(refreshToken());

        expect(post).toHaveBeenCalledWith(urlWeb.refreshToken);
        expect(store.getState().auth.status).toBe(AuthStatus.Authenticated);
        expect(store.getState().auth.token).toBe('abc123');
    });

    it('logs the user out when the refresh cookie is invalid or expired', async () => {
        const post = vi.fn().mockRejectedValue(new Error(API_ERROR_MSGS.INVALID_OR_EXPIRED_TOKEN));
        mockedCreateAuthClient.mockReturnValue(buildClientMock({post}));

        const store = buildAuthStore({status: AuthStatus.Authenticated, token: 'stale-token'});
        await store.dispatch(refreshToken());

        expect(store.getState().auth.status).toBe(AuthStatus.NoAuthenticated);
        expect(store.getState().auth.token).toBe('');
        expect(store.getState().auth.errors.refreshTokenErrorMsg).toBe(
            API_ERROR_MSGS.INVALID_OR_EXPIRED_TOKEN
        );
    });

    it('also logs the user out for other failures', async () => {
        const post = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreateAuthClient.mockReturnValue(buildClientMock({post}));

        const store = buildAuthStore({status: AuthStatus.Authenticated, token: 'valid-token'});
        await store.dispatch(refreshToken());

        expect(store.getState().auth.status).toBe(AuthStatus.NoAuthenticated);
        expect(store.getState().auth.token).toBe('');
        expect(store.getState().auth.errors.refreshTokenErrorMsg).toBe('Network error');
    });
});
