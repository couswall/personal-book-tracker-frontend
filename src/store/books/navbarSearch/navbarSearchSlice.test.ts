import {describe, expect, it} from 'vitest';
import {ISearchBookReducer} from '@store/books/searchBook/interfaces';
import {clearNavbarSearch, navbarSearchSlice} from '@store/books/navbarSearch/navbarSearchSlice';
import {navbarSearchBook} from '@store/books/navbarSearch/thunks';

const getInitialState = (): ISearchBookReducer =>
    navbarSearchSlice.reducer(undefined, {type: '@@INIT'});

const searchResult = {page: 1, maxResults: 5, books: [{id: 1, title: 'Dune'}]};

describe('navbarSearchSlice reducers', () => {
    it('returns the initial state by default', () => {
        expect(getInitialState()).toEqual({
            searchBookData: undefined,
            loading: false,
        });
    });

    it('clearNavbarSearch clears the searchBookData and error', () => {
        const stateWithData: ISearchBookReducer = {
            searchBookData: {page: 1, maxResults: 10, books: []},
            loading: false,
            error: 'Some error',
        };

        const state = navbarSearchSlice.reducer(stateWithData, clearNavbarSearch());

        expect(state.searchBookData).toBeUndefined();
        expect(state.error).toBeUndefined();
    });
});

describe('navbarSearchSlice extraReducers', () => {
    it('sets loading and clears the error on pending', () => {
        const state = navbarSearchSlice.reducer(
            getInitialState(),
            navbarSearchBook.pending('reqId', {token: 'tok', params: {searchText: 'dune'}})
        );

        expect(state.loading).toBe(true);
        expect(state.error).toBeUndefined();
    });

    it('stores the results on fulfilled', () => {
        const state = navbarSearchSlice.reducer(
            navbarSearchSlice.reducer(
                getInitialState(),
                navbarSearchBook.pending('reqId', {token: 'tok', params: {searchText: 'dune'}})
            ),
            navbarSearchBook.fulfilled(searchResult, 'reqId', {
                token: 'tok',
                params: {searchText: 'dune'},
            })
        );

        expect(state.loading).toBe(false);
        expect(state.searchBookData).toEqual(searchResult);
    });

    it('stores the error message on rejected', () => {
        const state = navbarSearchSlice.reducer(
            navbarSearchSlice.reducer(
                getInitialState(),
                navbarSearchBook.pending('reqId', {token: 'tok', params: {searchText: 'dune'}})
            ),
            navbarSearchBook.rejected(
                new Error('failed'),
                'reqId',
                {token: 'tok', params: {searchText: 'dune'}},
                'Search failed'
            )
        );

        expect(state.loading).toBe(false);
        expect(state.error).toBe('Search failed');
    });

    it('ignores a fulfilled response from a stale, superseded request', () => {
        const arg = {token: 'tok', params: {searchText: 'dune'}};
        const afterFirstPending = navbarSearchSlice.reducer(
            getInitialState(),
            navbarSearchBook.pending('first-request', arg)
        );
        const afterSecondPending = navbarSearchSlice.reducer(
            afterFirstPending,
            navbarSearchBook.pending('second-request', arg)
        );

        const afterStaleFulfilled = navbarSearchSlice.reducer(
            afterSecondPending,
            navbarSearchBook.fulfilled(searchResult, 'first-request', arg)
        );

        expect(afterStaleFulfilled.searchBookData).toBeUndefined();
        expect(afterStaleFulfilled.loading).toBe(true);
    });
});
