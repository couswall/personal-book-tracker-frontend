import axios, {AxiosError, AxiosResponse} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getEnvVariables} from '@helpers/getEnvVariables';
import {urlWeb} from '@constants/apiEndpoints';
import {ISearchBookAPIResponse, ISearchBookParams} from '@store/books/searchBook/interfaces';

const apiUrl = getEnvVariables().api_url;

export const searchBook = createAsyncThunk(
    'searchBook/fetch',
    async ({token, params}: {token: string; params: ISearchBookParams}, thunkAPI) => {
        const headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        };

        try {
            const url = apiUrl + urlWeb.searchBook;
            const {data}: AxiosResponse<ISearchBookAPIResponse> = await axios.get(url, {
                headers,
                params,
            });

            return data.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return thunkAPI.rejectWithValue(
                    error.response?.data.error?.message || 'Unknown API error'
                );
            }

            return thunkAPI.rejectWithValue('Unknown error');
        }
    }
);
