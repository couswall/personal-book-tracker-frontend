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

    it('posts the bookshelf and book ids, then calls onSuccess', async () => {
        const post = vi.fn().mockResolvedValue(undefined);
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({post}));
        const onSuccess = vi.fn().mockResolvedValue(undefined);

        await addBookToBookshelf({token: 'tok', bookshelfId: 1, apiBookId: 'dune-1965', onSuccess});

        expect(post).toHaveBeenCalledWith('bookshelfBook/addToBookshelf', {
            bookshelfId: 1,
            apiBookId: 'dune-1965',
        });
        expect(onSuccess).toHaveBeenCalled();
    });

    it('rejects and does not call onSuccess when the request fails', async () => {
        const post = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({post}));
        const onSuccess = vi.fn().mockResolvedValue(undefined);

        await expect(
            addBookToBookshelf({token: 'tok', bookshelfId: 1, apiBookId: 'dune-1965', onSuccess})
        ).rejects.toThrow('Network error');

        expect(onSuccess).not.toHaveBeenCalled();
    });
});

describe('updateBookshelf', () => {
    beforeEach(() => mockedCreatePrivateClient.mockReset());

    it('puts the bookshelfBookId and new bookshelfId, then calls onSuccess', async () => {
        const put = vi.fn().mockResolvedValue(undefined);
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({put}));
        const onSuccess = vi.fn().mockResolvedValue(undefined);

        await updateBookshelf({token: 'tok', bookshelfBookId: 10, bookshelfId: 2, onSuccess});

        expect(put).toHaveBeenCalledWith('bookshelfBook/updateBookshelf', {
            bookshelfBookId: 10,
            bookshelfId: 2,
        });
        expect(onSuccess).toHaveBeenCalled();
    });
});

describe('removeBookFromBookshelf', () => {
    beforeEach(() => mockedCreatePrivateClient.mockReset());

    it('deletes using the substituted endpoint, then calls onSuccess', async () => {
        const deleteFn = vi.fn().mockResolvedValue(undefined);
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({delete: deleteFn}));
        const onSuccess = vi.fn().mockResolvedValue(undefined);

        await removeBookFromBookshelf({token: 'tok', bookshelfBookId: 10, onSuccess});

        expect(deleteFn).toHaveBeenCalledWith('bookshelfBook/10');
        expect(onSuccess).toHaveBeenCalled();
    });
});
