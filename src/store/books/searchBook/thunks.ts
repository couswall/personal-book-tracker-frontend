import {createAsyncThunk} from '@reduxjs/toolkit';
import {urlWeb} from '@constants/apiEndpoints';
import {createPrivateClient} from '@api/httpClient';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {ISearchBookParams, ISearchingRes} from '@store/books/searchBook/interfaces';
import {IApiResponse} from '@api/api.interfaces';

export const searchBook = createAsyncThunk(
    'searchBook/fetch',
    async ({token, params}: {token: string; params: ISearchBookParams}, thunkAPI) => {
        try {
            const client = createPrivateClient(token);
            const {data} = await client.get<IApiResponse<ISearchingRes>, ISearchBookParams>(
                urlWeb.searchBook,
                {params}
            );
            return data;
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return thunkAPI.rejectWithValue(GENERAL_ERROR_MSGS.UNKNOWN_ERROR);
        }
    }
);
