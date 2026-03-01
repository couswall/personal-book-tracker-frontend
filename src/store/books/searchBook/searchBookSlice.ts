import {createSlice} from '@reduxjs/toolkit';
import {searchBook} from '@store/books/searchBook/thunks';
import {ISearchBookReducer} from '@store/books/searchBook/interfaces';

export const initialState: ISearchBookReducer = {
    searchBookData: undefined,
    loading: false,
};

export const searchBookSlice = createSlice({
    name: 'searchBook',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchBook.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(searchBook.fulfilled, (state, action) => {
                state.searchBookData = action.payload;
                state.loading = false;
                state.error = undefined;
            })
            .addCase(searchBook.rejected, (state, action) => {
                state.loading = false;
                state.error = typeof action.payload === 'string' ? action.payload : 'Unknown error';
            });
    },
});
