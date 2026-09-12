import {describe, expect, it} from 'vitest';
import {searchBook} from '@store/books/searchBook/thunks';
import {searchBookSlice} from '@store/books/searchBook/searchBookSlice';

const getInitialState = () => searchBookSlice.reducer(undefined, {type: '@@INIT'});

const searchResult = {page: 1, maxResults: 10, books: [{id: 1, title: 'Dune'}]};

describe('searchBookSlice extraReducers', () => {
    it('sets loading and clears the error on pending', () => {
        const state = searchBookSlice.reducer(
            getInitialState(),
            searchBook.pending('reqId', {token: 'tok', params: {searchText: 'dune'}})
        );

        expect(state.loading).toBe(true);
        expect(state.error).toBeUndefined();
    });

    it('stores the results on fulfilled', () => {
        const state = searchBookSlice.reducer(
            searchBookSlice.reducer(
                getInitialState(),
                searchBook.pending('reqId', {token: 'tok', params: {searchText: 'dune'}})
            ),
            searchBook.fulfilled(searchResult, 'reqId', {
                token: 'tok',
                params: {searchText: 'dune'},
            })
        );

        expect(state.loading).toBe(false);
        expect(state.searchBookData).toEqual(searchResult);
    });

    it('stores the error message on rejected', () => {
        const state = searchBookSlice.reducer(
            searchBookSlice.reducer(
                getInitialState(),
                searchBook.pending('reqId', {token: 'tok', params: {searchText: 'dune'}})
            ),
            searchBook.rejected(
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
        const afterFirstPending = searchBookSlice.reducer(
            getInitialState(),
            searchBook.pending('first-request', arg)
        );
        const afterSecondPending = searchBookSlice.reducer(
            afterFirstPending,
            searchBook.pending('second-request', arg)
        );

        const afterStaleFulfilled = searchBookSlice.reducer(
            afterSecondPending,
            searchBook.fulfilled(searchResult, 'first-request', arg)
        );

        expect(afterStaleFulfilled.searchBookData).toBeUndefined();
        expect(afterStaleFulfilled.loading).toBe(true);
    });

    it('ignores a rejected response from a stale, superseded request', () => {
        const arg = {token: 'tok', params: {searchText: 'dune'}};
        const afterFirstPending = searchBookSlice.reducer(
            getInitialState(),
            searchBook.pending('first-request', arg)
        );
        const afterSecondPending = searchBookSlice.reducer(
            afterFirstPending,
            searchBook.pending('second-request', arg)
        );

        const afterStaleRejected = searchBookSlice.reducer(
            afterSecondPending,
            searchBook.rejected(new Error('failed'), 'first-request', arg, 'Search failed')
        );

        expect(afterStaleRejected.error).toBeUndefined();
        expect(afterStaleRejected.loading).toBe(true);
    });
});
