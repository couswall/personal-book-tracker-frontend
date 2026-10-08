import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useBookshelfActions} from '@pages/Book/components/AddToBookshelfModal/useBookshelfActions';
import {ALREADY_ON_SHELF_ERROR} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.constants';
import * as bookshelfApi from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api';
import {
    read,
    reading,
} from '@pages/Book/components/AddToBookshelfModal/bookshelfSelection.fixtures';

vi.mock('@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api');

const onRefresh = vi.fn();

const renderActions = () =>
    renderHook(() => useBookshelfActions({token: 'tok', bookId: 'dune-1965', onRefresh}));

/** The request and the reload that follows it fail independently. */
describe('useBookshelfActions when the status reload fails', () => {
    beforeEach(() => {
        onRefresh.mockReset().mockRejectedValue(new Error('Network error'));
        vi.mocked(bookshelfApi.addBookToBookshelf).mockReset().mockResolvedValue(undefined);
        vi.mocked(bookshelfApi.updateBookshelf).mockReset().mockResolvedValue(undefined);
        vi.mocked(bookshelfApi.removeBookFromBookshelf).mockReset().mockResolvedValue(undefined);
    });

    it('still reports add, move and remove as done, and shows the reload error', async () => {
        const {result} = renderActions();

        let results: boolean[] = [];
        await act(async () => {
            results = [
                await result.current.add(reading),
                await result.current.update(10, read),
                await result.current.remove(10, 'Read'),
            ];
        });

        expect(results).toEqual([true, true, true]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.alert).toEqual({
            message: 'Network error',
            variant: 'danger',
            visible: true,
        });
    });

    it('does not throw when the reload after "already added" fails', async () => {
        vi.mocked(bookshelfApi.addBookToBookshelf).mockRejectedValue(
            new Error(ALREADY_ON_SHELF_ERROR)
        );
        const {result} = renderActions();

        let added = true;
        await act(async () => {
            added = await result.current.add(reading);
        });

        expect(added).toBe(false);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.alert.message).toBe('Network error');
    });
});
