import {createSlice} from '@reduxjs/toolkit';
import {navbarSearchBook} from '@store/books/navbarSearch/navbarSearchThunk';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {ISearchBookReducer} from '@store/books/searchBook/interfaces';

const initialState: ISearchBookReducer = {
    searchBookData: undefined,
    loading: false,
};

export const navbarSearchSlice = createSlice({
    name: 'navbarSearch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(navbarSearchBook.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(navbarSearchBook.fulfilled, (state, action) => {
                state.searchBookData = action.payload;
                state.loading = false;
                state.error = undefined;
            })
            .addCase(navbarSearchBook.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    typeof action.payload === 'string'
                        ? action.payload
                        : GENERAL_ERROR_MSGS.UNKNOWN_ERROR;
            });
    },
});
