import {beforeEach, describe, expect, it, vi} from 'vitest';
import {configureStore} from '@reduxjs/toolkit';
import {searchBook} from '@store/books/searchBook/thunks';
import {searchBookSlice} from '@store/books/searchBook/searchBookSlice';
import {createPrivateClient} from '@api/httpClient';
import {IHttpClient} from '@api/api.interfaces';

vi.mock('@api/httpClient', () => ({
    createPrivateClient: vi.fn(),
}));

const mockedCreatePrivateClient = vi.mocked(createPrivateClient);

const buildClientMock = (overrides: Partial<IHttpClient>): IHttpClient => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    ...overrides,
});

const buildStore = () => configureStore({reducer: {searchBook: searchBookSlice.reducer}});

const searchResult = {page: 1, maxResults: 10, books: [{id: 1, title: 'Dune'}]};

describe('searchBook thunk + slice', () => {
    beforeEach(() => {
        mockedCreatePrivateClient.mockReset();
    });

    it('stores the results on success', async () => {
        const get = vi.fn().mockResolvedValue({success: true, message: '', data: searchResult});
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));

        const store = buildStore();
        await store.dispatch(searchBook({token: 'tok', params: {searchText: 'dune'}}));

        expect(store.getState().searchBook.loading).toBe(false);
        expect(store.getState().searchBook.searchBookData).toEqual(searchResult);
        expect(store.getState().searchBook.error).toBeUndefined();
    });

    it('sets loading while the request is in flight', () => {
        const state = searchBookSlice.reducer(
            searchBookSlice.getInitialState(),
            searchBook.pending('reqId', {token: 'tok', params: {searchText: 'dune'}})
        );

        expect(state.loading).toBe(true);
    });

    it('stores the error message on failure', async () => {
        const get = vi.fn().mockRejectedValue(new Error('Search failed'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));

        const store = buildStore();
        await store.dispatch(searchBook({token: 'tok', params: {searchText: 'dune'}}));

        expect(store.getState().searchBook.loading).toBe(false);
        expect(store.getState().searchBook.error).toBe('Search failed');
    });
});
