import {beforeEach, describe, expect, it, vi} from 'vitest';
import {configureStore} from '@reduxjs/toolkit';
import {navbarSearchSlice} from '@store/books/navbarSearch/navbarSearchSlice';
import {navbarSearchBook} from '@store/books/navbarSearch/thunks';
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

const buildStore = () => configureStore({reducer: {navbarSearch: navbarSearchSlice.reducer}});

const searchResult = {page: 1, maxResults: 5, books: [{id: 1, title: 'Dune'}]};

describe('navbarSearchBook thunk', () => {
    beforeEach(() => {
        mockedCreatePrivateClient.mockReset();
    });

    it('dispatches fulfilled and stores the results on success', async () => {
        const get = vi.fn().mockResolvedValue({success: true, message: '', data: searchResult});
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));

        const store = buildStore();
        await store.dispatch(navbarSearchBook({token: 'tok', params: {searchText: 'dune'}}));

        expect(store.getState().navbarSearch.loading).toBe(false);
        expect(store.getState().navbarSearch.searchBookData).toEqual(searchResult);
    });

    it('dispatches rejected and stores the error message on failure', async () => {
        const get = vi.fn().mockRejectedValue(new Error('Search failed'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));

        const store = buildStore();
        await store.dispatch(navbarSearchBook({token: 'tok', params: {searchText: 'dune'}}));

        expect(store.getState().navbarSearch.loading).toBe(false);
        expect(store.getState().navbarSearch.error).toBe('Search failed');
    });
});
