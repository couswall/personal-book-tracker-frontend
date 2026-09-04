import {describe, expect, it} from 'vitest';
import {authSlice, cleanErrorMessages, onLogout} from '@store/auth/authSlice';
import {loginUser, refreshToken, registerUser} from '@store/auth/thunks';
import {
    AuthStatus,
    IAuthSliceState,
    ILoginParams,
    IRegisterUserParams,
} from '@store/auth/interfaces';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';

const noopNavigate = () => {};
const credentials: ILoginParams = {emailOrUsername: 'jane', password: 'secret'};
const newUser: IRegisterUserParams = {
    fullName: 'Jane Doe',
    username: 'jane',
    email: 'jane@test.com',
    password: 'Secret1!',
};
const loginSuccessRes = {
    user: {id: 1, fullName: 'Jane Doe', username: 'jane', email: 'jane@test.com'},
    token: 'abc123',
};

const getInitialState = (): IAuthSliceState => authSlice.reducer(undefined, {type: '@@INIT'});

describe('authSlice reducers', () => {
    it('returns the checking status by default', () => {
        expect(getInitialState().status).toBe(AuthStatus.Checking);
    });

    it('onLogout resets the state to its initial values', () => {
        const authenticatedState: IAuthSliceState = {
            ...getInitialState(),
            status: AuthStatus.Authenticated,
            token: 'abc123',
            user: loginSuccessRes.user,
        };

        const state = authSlice.reducer(authenticatedState, onLogout());

        expect(state).toEqual(getInitialState());
    });

    it('cleanErrorMessages clears every error message', () => {
        const stateWithErrors: IAuthSliceState = {
            ...getInitialState(),
            errors: {
                loginErrorMsg: 'bad login',
                registerUserErrorMsg: 'bad register',
                refreshTokenErrorMsg: 'bad refresh',
            },
        };

        const state = authSlice.reducer(stateWithErrors, cleanErrorMessages());

        expect(state.errors).toEqual(getInitialState().errors);
    });
});

describe('authSlice extraReducers - loginUser', () => {
    it('sets the checking status and loading flag on pending', () => {
        const state = authSlice.reducer(
            getInitialState(),
            loginUser.pending('reqId', {credentials, navigate: noopNavigate})
        );

        expect(state.loadings.loginLoading).toBe(true);
        expect(state.status).toBe(AuthStatus.Checking);
    });

    it('stores the user and token on fulfilled', () => {
        const state = authSlice.reducer(
            getInitialState(),
            loginUser.fulfilled(loginSuccessRes, 'reqId', {credentials, navigate: noopNavigate})
        );

        expect(state.status).toBe(AuthStatus.Authenticated);
        expect(state.user).toEqual(loginSuccessRes.user);
        expect(state.token).toBe(loginSuccessRes.token);
        expect(state.loadings.loginLoading).toBe(false);
    });

    it('stores the rejection message on rejected', () => {
        const state = authSlice.reducer(
            getInitialState(),
            loginUser.rejected(
                new Error('failed'),
                'reqId',
                {credentials, navigate: noopNavigate},
                'Invalid credentials'
            )
        );

        expect(state.status).toBe(AuthStatus.NoAuthenticated);
        expect(state.loadings.loginLoading).toBe(false);
        expect(state.errors.loginErrorMsg).toBe('Invalid credentials');
    });

    it('falls back to the unknown error message when the rejection has no payload', () => {
        const state = authSlice.reducer(
            getInitialState(),
            loginUser.rejected(new Error('failed'), 'reqId', {credentials, navigate: noopNavigate})
        );

        expect(state.errors.loginErrorMsg).toBe(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
    });
});

describe('authSlice extraReducers - registerUser', () => {
    it('stores the user and token on fulfilled', () => {
        const state = authSlice.reducer(
            getInitialState(),
            registerUser.fulfilled(loginSuccessRes, 'reqId', {newUser, navigate: noopNavigate})
        );

        expect(state.status).toBe(AuthStatus.Authenticated);
        expect(state.token).toBe(loginSuccessRes.token);
    });

    it('stores the rejection message on rejected', () => {
        const state = authSlice.reducer(
            getInitialState(),
            registerUser.rejected(
                new Error('failed'),
                'reqId',
                {newUser, navigate: noopNavigate},
                'Username already taken'
            )
        );

        expect(state.status).toBe(AuthStatus.NoAuthenticated);
        expect(state.errors.registerUserErrorMsg).toBe('Username already taken');
    });
});

describe('authSlice extraReducers - refreshToken', () => {
    it('refreshes the user and token on fulfilled without touching login/register state', () => {
        const state = authSlice.reducer(
            getInitialState(),
            refreshToken.fulfilled(loginSuccessRes, 'reqId')
        );

        expect(state.status).toBe(AuthStatus.Authenticated);
        expect(state.token).toBe(loginSuccessRes.token);
    });

    it('stores the rejection message on rejected without resetting the status', () => {
        const authenticatedState: IAuthSliceState = {
            ...getInitialState(),
            status: AuthStatus.Authenticated,
        };

        const state = authSlice.reducer(
            authenticatedState,
            refreshToken.rejected(new Error('failed'), 'reqId', undefined, 'Session expired')
        );

        expect(state.status).toBe(AuthStatus.Authenticated);
        expect(state.errors.refreshTokenErrorMsg).toBe('Session expired');
    });
});
