import {NavigateFunction} from 'react-router';
import {privateRoutes} from '@routes/routes';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {createAuthClient} from '@api/httpClient';
import {urlWeb} from '@constants/apiEndpoints';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {ILoginParams, ILoginSuccessRes, IRegisterUserParams} from '@store/auth/interfaces';
import {IApiResponse} from '@api/api.interfaces';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (
        {credentials, navigate}: {credentials: ILoginParams; navigate: NavigateFunction},
        thunkAPI
    ) => {
        try {
            const client = createAuthClient();
            const {data} = await client.post<IApiResponse<ILoginSuccessRes>>(
                urlWeb.login,
                credentials
            );
            navigate(privateRoutes.home);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (
        {newUser, navigate}: {newUser: IRegisterUserParams; navigate: NavigateFunction},
        {rejectWithValue}
    ) => {
        try {
            const client = createAuthClient();
            const {data} = await client.post<IApiResponse<ILoginSuccessRes>>(
                urlWeb.registerUser,
                newUser
            );
            navigate(privateRoutes.home);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    try {
        await createAuthClient().post(urlWeb.logout);
    } catch {
        // Ignore errors: the user is logged out locally either way.
    }
});

export const refreshToken = createAsyncThunk<ILoginSuccessRes, void>(
    'auth/refreshToken',
    async (_, thunkAPI) => {
        try {
            const client = createAuthClient();
            const {data} = await client.post<IApiResponse<ILoginSuccessRes>>(urlWeb.refreshToken);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
        }
    }
);
