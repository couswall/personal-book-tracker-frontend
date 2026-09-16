import {beforeEach, describe, expect, it, vi} from 'vitest';
import {updateReadingProgress} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.api';
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

const bookshelfBook = {
    id: 1,
    bookshelfId: 2,
    bookId: 3,
    readingProgress: 42,
    currentPage: 120,
    totalPages: 412,
};

describe('updateReadingProgress', () => {
    beforeEach(() => mockedCreatePrivateClient.mockReset());

    it('puts the progress payload, calls onSuccess, and returns the updated bookshelfBook', async () => {
        const put = vi.fn().mockResolvedValue({success: true, message: '', data: {bookshelfBook}});
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({put}));
        const onSuccess = vi.fn().mockResolvedValue(undefined);

        const result = await updateReadingProgress({
            token: 'tok',
            bookshelfBookId: 1,
            progressType: 'PAGE',
            value: 120,
            isFinished: false,
            onSuccess,
        });

        expect(put).toHaveBeenCalledWith('bookshelfBook/updateReadingProgress', {
            bookshelfBookId: 1,
            progressType: 'PAGE',
            value: 120,
            isFinished: false,
        });
        expect(onSuccess).toHaveBeenCalled();
        expect(result).toEqual(bookshelfBook);
    });

    it('rejects and does not call onSuccess when the request fails', async () => {
        const put = vi.fn().mockRejectedValue(new Error('Network error'));
        mockedCreatePrivateClient.mockReturnValue(buildClientMock({put}));
        const onSuccess = vi.fn().mockResolvedValue(undefined);

        await expect(
            updateReadingProgress({
                token: 'tok',
                bookshelfBookId: 1,
                progressType: 'PAGE',
                value: 120,
                onSuccess,
            })
        ).rejects.toThrow('Network error');

        expect(onSuccess).not.toHaveBeenCalled();
    });
});
