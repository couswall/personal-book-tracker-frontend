import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IBook,
  IGetBookByIdInitialState,
} from "@store/books/getBookById/interfaces";
import { getBookById } from "@store/books/getBookById/thunks";

const initialState: IGetBookByIdInitialState = {
  book: null,
  loading: false,
  error: undefined,
};

export const getBookByIdSlice = createSlice({
  name: "getBookById",
  initialState,
  reducers: {
    cleanGetBookByIdState: (state) => {
      state.book = initialState.book;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        getBookById.fulfilled,
        (state, action: PayloadAction<IBook | undefined>) => {
          state.loading = false;
          state.book = action.payload || null;
          state.error = undefined;
        }
      )
      .addCase(getBookById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      });
  },
});

export const { cleanGetBookByIdState } = getBookByIdSlice.actions;
