import {beforeEach, describe, expect, it, vi} from 'vitest';
import {getBookshelvesWithStatus} from '@pages/Book/book.api';
import {createPrivateClient} from '@api/httpClient';
import {IHttpClient} from '@api/api.interfaces';
import {IBookshelfWithStatus, IRead} from '@pages/Book/book.interfaces';

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

const bookshelves: IBookshelfWithStatus[] = [
    {
        id: 1,
        name: 'Currently Reading',
        type: 'CURRENTLY_READING',
        isSelected: true,
        bookshelfBookId: 10,
        bookCount: 3,
        readingProgress: 42,
        currentPage: 120,
        progressType: 'PAGE',
    },
];

const reads: IRead[] = [{finishedAt: '2026-03-15T00:00:00.000Z', hasChallenge: true}];

describe('getBookshelvesWithStatus', () => {
    beforeEach(() => {
        mockedCreatePrivateClient.mockReset();
    });

    it('fetches the endpoint with the apiBookId substituted, and reports the bookshelves and reads', async () => {
        const get = vi.fn().mockResolvedValue({
            success: true,
            message: '',
            data: {bookshelves, reads},
        });
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));
        const setBookshelves = vi.fn();
        const setReads = vi.fn();

        await getBookshelvesWithStatus({
            token: 'tok',
            apiBookId: 'dune-1965',
            setBookshelves,
            setReads,
        });

        expect(mockedCreatePrivateClient).toHaveBeenCalledWith('tok');
        expect(get).toHaveBeenCalledWith('bookshelf/bookStatus/dune-1965');
        expect(setBookshelves).toHaveBeenCalledWith(bookshelves);
        expect(setReads).toHaveBeenCalledWith(reads);
    });

    it('rejects when the request fails, without calling setBookshelves', async () => {
        const get = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));
        const setBookshelves = vi.fn();
        const setReads = vi.fn();

        await expect(
            getBookshelvesWithStatus({
                token: 'tok',
                apiBookId: 'dune-1965',
                setBookshelves,
                setReads,
            })
        ).rejects.toThrow('Network error');

        expect(setBookshelves).not.toHaveBeenCalled();
        expect(setReads).not.toHaveBeenCalled();
    });
});
