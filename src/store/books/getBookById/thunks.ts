import {createAsyncThunk} from '@reduxjs/toolkit';
import {createPrivateClient} from '@api/httpClient';
import {urlWeb} from '@constants/apiEndpoints';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {IApiResponse} from '@api/api.interfaces';
import {IBook} from '@store/books/getBookById/interfaces';

export const getBookById = createAsyncThunk(
    'getBookById/fetch',
    async ({token, id}: {token: string; id: string}, thunkAPI) => {
        try {
            const client = createPrivateClient(token);
            const endpoint = urlWeb.getBookById.replace(':id', id);
            const {data} = await client.get<IApiResponse<IBook>>(endpoint);
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
        }
    }
);
