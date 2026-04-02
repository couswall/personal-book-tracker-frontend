import {NavigateFunction} from 'react-router';
import {privateRoutes} from '@routes/routes';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '@store/store';
import {onLogout} from '@store/auth/authSlice';
import {createPrivateClient, createPublicClient} from '@api/httpClient';
import {urlWeb} from '@constants/apiEndpoints';
import {API_ERROR_MSGS, GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {ILoginParams, ILoginSuccessRes, IRegisterUserParams} from '@store/auth/interfaces';
import {IApiResponse} from '@api/api.interfaces';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (
        {credentials, navigate}: {credentials: ILoginParams; navigate: NavigateFunction},
        thunkAPI
    ) => {
        try {
            const client = createPublicClient();
            const {data} = await client.post<IApiResponse<ILoginSuccessRes>>(
                urlWeb.login,
                credentials
            );
            navigate(privateRoutes.myBooks);
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
            const client = createPublicClient();
            const {data} = await client.post<IApiResponse<ILoginSuccessRes>>(
                urlWeb.registerUser,
                newUser
            );
            navigate(privateRoutes.myBooks);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
        }
    }
);

export const refreshToken = createAsyncThunk<ILoginSuccessRes, void, {state: RootState}>(
    'auth/refreshToken',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.token;
            const client = createPrivateClient(token);
            const {data} = await client.post<IApiResponse<ILoginSuccessRes>>(urlWeb.refreshToken);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === API_ERROR_MSGS.INVALID_OR_EXPIRED_TOKEN) {
                    thunkAPI.dispatch(onLogout());
                }
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
        }
    }
);
