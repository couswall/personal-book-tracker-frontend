import {createSlice} from '@reduxjs/toolkit';
import {navbarSearchBook} from '@store/books/navbarSearch/thunks';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';
import {ISearchBookReducer} from '@store/books/searchBook/interfaces';

const initialState: ISearchBookReducer = {
    searchBookData: undefined,
    loading: false,
};

export const navbarSearchSlice = createSlice({
    name: 'navbarSearch',
    initialState,
    reducers: {
        clearNavbarSearch: (state) => {
            state.searchBookData = undefined;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(navbarSearchBook.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(navbarSearchBook.fulfilled, (state, action) => {
                if (action.meta.requestId !== state.currentRequestId) return;
                state.searchBookData = action.payload;
                state.loading = false;
                state.error = undefined;
            })
            .addCase(navbarSearchBook.rejected, (state, action) => {
                if (action.meta.requestId !== state.currentRequestId) return;
                state.loading = false;
                state.error =
                    typeof action.payload === 'string'
                        ? action.payload
                        : GENERAL_ERROR_MSGS.UNKNOWN_ERROR;
            });
    },
});

export const {clearNavbarSearch} = navbarSearchSlice.actions;
