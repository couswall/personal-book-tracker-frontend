import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStatus, IAuthSliceState, ILoginSuccessRes } from "@store/auth/interfaces";
import { loginUser, registerUser, refreshToken } from "@store/auth/thunks";

const initialState: IAuthSliceState = {
    status: AuthStatus.Checking,
    user: {
        id: 0,
        fullName: '',
        username: '',
        email: '',
    },
    token: '',
    loadings: {
        loginLoading: false,
        registerUserLoading: false,
        refreshTokenLoading: false,
    },
    errors: {
        loginErrorMsg: undefined,
        registerUserErrorMsg: undefined,
        refreshTokenErrorMsg: undefined,
    }
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onLogout: (state) => {
            state.status = initialState.status;
            state.user = initialState.user;
            state.token = initialState.token;
            state.loadings = initialState.loadings;
            state.errors = initialState.errors;
        },
        cleanErrorMessages: (state) => {
            state.errors = initialState.errors;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = AuthStatus.Checking;
                state.loadings.loginLoading = true;
                state.errors.loginErrorMsg = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<ILoginSuccessRes>) => {
                state.status = AuthStatus.Authenticated;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loadings.loginLoading = false;
                state.errors.loginErrorMsg = undefined;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = AuthStatus.NoAuthenticated;
                state.loadings.loginLoading = false;
                state.errors.loginErrorMsg = typeof action.payload === 'string' 
                    ? action.payload 
                    : 'Unknown error';
            })
            .addCase(registerUser.pending, (state) => {
                state.status = AuthStatus.Checking;
                state.loadings.registerUserLoading = true;
                state.errors.registerUserErrorMsg = undefined;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<ILoginSuccessRes>) => {
                state.status = AuthStatus.Authenticated;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loadings.registerUserLoading = false;
                state.errors.registerUserErrorMsg = undefined;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = AuthStatus.NoAuthenticated;
                state.loadings.registerUserLoading = false;
                state.errors.registerUserErrorMsg = typeof action.payload === 'string'
                    ? action.payload
                    : 'Unknown error';
            })
            .addCase(refreshToken.pending, (state) => {
                state.loadings.refreshTokenLoading = true;
                state.errors.refreshTokenErrorMsg = undefined;
            })
            .addCase(refreshToken.fulfilled, (state, action: PayloadAction<ILoginSuccessRes>) => {
                state.status = AuthStatus.Authenticated;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loadings.refreshTokenLoading = false;
                state.errors.refreshTokenErrorMsg = undefined;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.loadings.refreshTokenLoading = false;
                state.errors.refreshTokenErrorMsg = typeof action.payload === 'string'
                    ? action.payload
                    : 'Unknown error';
            })
    },
});

export const {
    cleanErrorMessages,
    onLogout,
} = authSlice.actions;