import {describe, expect, it} from 'vitest';
import {getBookById} from '@store/books/getBookById/thunks';
import {getBookByIdSlice} from '@store/books/getBookById/getBookByIdSlice';
import {IBook} from '@store/books/getBookById/interfaces';

const getInitialState = () => getBookByIdSlice.reducer(undefined, {type: '@@INIT'});

const book: IBook = {
    id: 1,
    apiBookId: 'abc',
    title: 'Dune',
    authors: ['Frank Herbert'],
    description: null,
    publishedDate: null,
    coverImageUrl: null,
    categories: [],
    pageCount: 412,
    averageRating: 4.5,
    reviewCount: 100,
    subtitle: null,
    deletedAt: null,
};

describe('getBookByIdSlice extraReducers', () => {
    it('sets loading and clears the error on pending', () => {
        const state = getBookByIdSlice.reducer(
            getInitialState(),
            getBookById.pending('reqId', {token: 'tok', id: '1'})
        );

        expect(state.loading).toBe(true);
        expect(state.error).toBeUndefined();
    });

    it('stores the book on fulfilled', () => {
        const state = getBookByIdSlice.reducer(
            getInitialState(),
            getBookById.fulfilled(book, 'reqId', {token: 'tok', id: '1'})
        );

        expect(state.loading).toBe(false);
        expect(state.book).toEqual(book);
    });

    it('stores the error message on rejected', () => {
        const state = getBookByIdSlice.reducer(
            getInitialState(),
            getBookById.rejected(
                new Error('failed'),
                'reqId',
                {token: 'tok', id: '404'},
                'Book not found'
            )
        );

        expect(state.loading).toBe(false);
        expect(state.error).toBe('Book not found');
    });
});

describe('getBookByIdSlice reducers', () => {
    it('cleanGetBookByIdState resets to the initial state', () => {
        const populatedState = getBookByIdSlice.reducer(
            undefined,
            getBookById.fulfilled(book, 'reqId', {token: 'tok', id: '1'})
        );

        const state = getBookByIdSlice.reducer(
            populatedState,
            getBookByIdSlice.actions.cleanGetBookByIdState()
        );

        expect(state).toEqual(getBookByIdSlice.getInitialState());
    });
});
