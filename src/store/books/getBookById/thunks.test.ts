import {beforeEach, describe, expect, it, vi} from 'vitest';
import {configureStore} from '@reduxjs/toolkit';
import {getBookById} from '@store/books/getBookById/thunks';
import {getBookByIdSlice} from '@store/books/getBookById/getBookByIdSlice';
import {createPrivateClient} from '@api/httpClient';
import {IHttpClient} from '@api/api.interfaces';
import {IBook} from '@store/books/getBookById/interfaces';

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

const buildStore = () => configureStore({reducer: {getBookById: getBookByIdSlice.reducer}});

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

describe('getBookById thunk + slice', () => {
    beforeEach(() => {
        mockedCreatePrivateClient.mockReset();
    });

    it('stores the book on success', async () => {
        const get = vi.fn().mockResolvedValue({success: true, message: '', data: book});
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));

        const store = buildStore();
        await store.dispatch(getBookById({token: 'tok', id: '1'}));

        expect(get).toHaveBeenCalledWith('book/bookById/1');
        expect(store.getState().getBookById.loading).toBe(false);
        expect(store.getState().getBookById.book).toEqual(book);
    });

    it('stores the error message on failure', async () => {
        const get = vi.fn().mockRejectedValue(new Error('Book not found'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));

        const store = buildStore();
        await store.dispatch(getBookById({token: 'tok', id: '404'}));

        expect(store.getState().getBookById.loading).toBe(false);
        expect(store.getState().getBookById.book).toBeNull();
        expect(store.getState().getBookById.error).toBe('Book not found');
    });

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
