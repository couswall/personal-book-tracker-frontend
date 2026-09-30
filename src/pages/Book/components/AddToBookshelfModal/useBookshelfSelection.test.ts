import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useBookshelfSelection} from '@pages/Book/components/AddToBookshelfModal/useBookshelfSelection';
import * as bookshelfApi from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api';
import {
    buildRead,
    onRead,
    read,
    reading,
    renderSelection,
    toBeRead,
} from '@pages/Book/components/AddToBookshelfModal/bookshelfSelection.fixtures';

vi.mock('@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api');

describe('useBookshelfSelection', () => {
    beforeEach(() => {
        vi.mocked(bookshelfApi.addBookToBookshelf).mockReset().mockResolvedValue(undefined);
        vi.mocked(bookshelfApi.updateBookshelf).mockReset().mockResolvedValue(undefined);
        vi.mocked(bookshelfApi.removeBookFromBookshelf).mockReset().mockResolvedValue(undefined);
    });

    it('is in Add mode when the book is on no shelf, and adds on click', async () => {
        const {result} = renderSelection([toBeRead, reading, read]);
        expect(result.current.isMoveMode).toBe(false);

        await act(() => result.current.handleSelectBookshelf(read));

        expect(bookshelfApi.addBookToBookshelf).toHaveBeenCalledWith(
            expect.objectContaining({bookshelfId: 3, apiBookId: 'OXf3o_EBrxYC'})
        );
        expect(bookshelfApi.updateBookshelf).not.toHaveBeenCalled();
    });

    it('is in Move mode when the book is on a shelf, and moves on click with no questions', async () => {
        const {result} = renderSelection([toBeRead, reading, onRead], [buildRead('2026-03-15')]);
        expect(result.current.isMoveMode).toBe(true);

        await act(() => result.current.handleSelectBookshelf(toBeRead));

        expect(bookshelfApi.updateBookshelf).toHaveBeenCalledWith(
            expect.objectContaining({bookshelfBookId: 58, bookshelfId: 1})
        );
        expect(bookshelfApi.addBookToBookshelf).not.toHaveBeenCalled();
    });

    it('sends only the documented fields', async () => {
        const {result} = renderSelection([toBeRead, reading, onRead]);

        await act(() => result.current.handleSelectBookshelf(reading));

        expect(vi.mocked(bookshelfApi.updateBookshelf).mock.calls[0][0]).toStrictEqual({
            token: 'tok',
            bookshelfBookId: 58,
            bookshelfId: 2,
        });
    });

    it('marks the clicked shelf as the target only while it is being saved', async () => {
        let finish: () => void = () => {};
        vi.mocked(bookshelfApi.updateBookshelf).mockReturnValue(
            new Promise((resolve) => {
                finish = () => resolve(undefined);
            })
        );
        const {result} = renderSelection([toBeRead, reading, onRead]);

        let pending: Promise<void> = Promise.resolve();
        act(() => {
            pending = result.current.handleSelectBookshelf(reading);
        });
        expect(result.current.isTarget(reading)).toBe(true);
        expect(result.current.isTarget(onRead)).toBe(false);

        await act(async () => {
            finish();
            await pending;
        });
        expect(result.current.isTarget(reading)).toBe(false);
    });

    it('ignores clicks on the current shelf', async () => {
        const {result} = renderSelection([toBeRead, reading, onRead]);

        await act(() => result.current.handleSelectBookshelf(onRead));

        expect(bookshelfApi.updateBookshelf).not.toHaveBeenCalled();
    });

    it('always confirms before removing, with no warning when there are no reads', async () => {
        const {result} = renderSelection([toBeRead, reading, onRead]);

        act(() => result.current.handleRequestRemove());

        expect(result.current.isConfirmingRemove).toBe(true);
        expect(result.current.removalWarning).toBeNull();
        expect(bookshelfApi.removeBookFromBookshelf).not.toHaveBeenCalled();
    });

    it('warns with the read years before removing a book that was finished', async () => {
        const reads = [buildRead('2026-03-15T00:00:00.000Z', true)];
        const {result} = renderSelection([toBeRead, reading, onRead], reads);

        act(() => result.current.handleRequestRemove());
        await act(() => result.current.handleDeleteFromBookshelf());

        expect(bookshelfApi.removeBookFromBookshelf).toHaveBeenCalledWith(
            expect.objectContaining({bookshelfBookId: 58})
        );
        expect(result.current.isConfirmingRemove).toBe(false);
    });

    it('drops the confirmation if the book leaves the shelf some other way', () => {
        const {result, rerender} = renderHook(
            ({bookshelves}) =>
                useBookshelfSelection({
                    bookshelves,
                    reads: [],
                    token: 'tok',
                    bookId: 'OXf3o_EBrxYC',
                    onRefresh: vi.fn().mockResolvedValue(undefined),
                    onCloseModal: vi.fn(),
                }),
            {initialProps: {bookshelves: [toBeRead, reading, onRead]}}
        );

        act(() => result.current.handleRequestRemove());
        expect(result.current.isConfirmingRemove).toBe(true);

        rerender({bookshelves: [toBeRead, reading, read]});
        expect(result.current.isConfirmingRemove).toBe(false);

        rerender({bookshelves: [toBeRead, reading, {...onRead, bookshelfBookId: 99}]});
        expect(result.current.isConfirmingRemove).toBe(false);
    });

    it('keeps the confirmation open when the remove fails', async () => {
        vi.mocked(bookshelfApi.removeBookFromBookshelf).mockRejectedValue(new Error('Nope'));
        const {result} = renderSelection([toBeRead, reading, onRead]);

        act(() => result.current.handleRequestRemove());
        await act(() => result.current.handleDeleteFromBookshelf());

        expect(result.current.isConfirmingRemove).toBe(true);
    });
});
