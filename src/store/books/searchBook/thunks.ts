import {createAsyncThunk} from '@reduxjs/toolkit';
import {urlWeb} from '@constants/apiEndpoints';
import {createPrivateClient} from '@api/httpClient';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {ISearchBookParams, ISearchingRes} from '@store/books/searchBook/interfaces';
import {IApiResponse} from '@api/api.interfaces';

export const createSearchThunk = (typePrefix: string) =>
    createAsyncThunk(typePrefix, async ({params}: {params: ISearchBookParams}, thunkAPI) => {
        try {
            const client = createPrivateClient();
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
    });

export const searchBook = createSearchThunk('searchBook/fetch');
