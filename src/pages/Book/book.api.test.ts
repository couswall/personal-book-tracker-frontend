import {beforeEach, describe, expect, it, vi} from 'vitest';
import {getBookshelvesWithStatus} from '@pages/Book/book.api';
import {createPrivateClient} from '@api/httpClient';
import {IHttpClient} from '@api/api.interfaces';
import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';

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
        isSelected: true,
        bookshelfBookId: 10,
        bookCount: 3,
        readingProgress: 42,
        currentPage: 120,
        progressType: 'PAGE',
    },
];

describe('getBookshelvesWithStatus', () => {
    beforeEach(() => {
        mockedCreatePrivateClient.mockReset();
    });

    it('fetches the endpoint with the userId and apiBookId substituted, and reports the bookshelves', async () => {
        const get = vi.fn().mockResolvedValue({success: true, message: '', data: {bookshelves}});
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));
        const setBookshelves = vi.fn();

        await getBookshelvesWithStatus({
            token: 'tok',
            userId: 7,
            apiBookId: 'dune-1965',
            setBookshelves,
        });

        expect(mockedCreatePrivateClient).toHaveBeenCalledWith('tok');
        expect(get).toHaveBeenCalledWith('bookshelf/bookStatus/7/dune-1965');
        expect(setBookshelves).toHaveBeenCalledWith(bookshelves);
    });

    it('rejects when the request fails, without calling setBookshelves', async () => {
        const get = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({get}));
        const setBookshelves = vi.fn();

        await expect(
            getBookshelvesWithStatus({
                token: 'tok',
                userId: 7,
                apiBookId: 'dune-1965',
                setBookshelves,
            })
        ).rejects.toThrow('Network error');

        expect(setBookshelves).not.toHaveBeenCalled();
    });
});
