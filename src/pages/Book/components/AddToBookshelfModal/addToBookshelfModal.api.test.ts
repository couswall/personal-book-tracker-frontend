import {beforeEach, describe, expect, it, vi} from 'vitest';
import {
    addBookToBookshelf,
    removeBookFromBookshelf,
    updateBookshelf,
} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api';
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

describe('addBookToBookshelf', () => {
    beforeEach(() => mockedCreatePrivateClient.mockReset());

    it('posts only the bookshelf and book ids', async () => {
        const post = vi.fn().mockResolvedValue(undefined);
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({post}));

        await addBookToBookshelf({token: 'tok', bookshelfId: 1, apiBookId: 'dune-1965'});

        expect(mockedCreatePrivateClient).toHaveBeenCalledWith('tok');
        expect(post).toHaveBeenCalledWith('bookshelfBook/addToBookshelf', {
            bookshelfId: 1,
            apiBookId: 'dune-1965',
        });
    });

    it('rejects when the request fails', async () => {
        const post = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({post}));

        await expect(
            addBookToBookshelf({token: 'tok', bookshelfId: 1, apiBookId: 'dune-1965'})
        ).rejects.toThrow('Network error');
    });
});

describe('updateBookshelf', () => {
    beforeEach(() => mockedCreatePrivateClient.mockReset());

    it('puts only the bookshelfBookId and new bookshelfId', async () => {
        const put = vi.fn().mockResolvedValue(undefined);
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({put}));

        await updateBookshelf({token: 'tok', bookshelfBookId: 10, bookshelfId: 2});

        expect(put).toHaveBeenCalledWith('bookshelfBook/updateBookshelf', {
            bookshelfBookId: 10,
            bookshelfId: 2,
        });
    });

    it('rejects when the request fails', async () => {
        const put = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({put}));

        await expect(
            updateBookshelf({token: 'tok', bookshelfBookId: 10, bookshelfId: 2})
        ).rejects.toThrow('Network error');
    });
});

describe('removeBookFromBookshelf', () => {
    beforeEach(() => mockedCreatePrivateClient.mockReset());

    it('deletes using the substituted endpoint', async () => {
        const deleteFn = vi.fn().mockResolvedValue(undefined);
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({delete: deleteFn}));

        await removeBookFromBookshelf({token: 'tok', bookshelfBookId: 10});

        expect(deleteFn).toHaveBeenCalledWith('bookshelfBook/10');
    });

    it('rejects when the request fails', async () => {
        const deleteFn = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({delete: deleteFn}));

        await expect(removeBookFromBookshelf({token: 'tok', bookshelfBookId: 10})).rejects.toThrow(
            'Network error'
        );
    });
});
