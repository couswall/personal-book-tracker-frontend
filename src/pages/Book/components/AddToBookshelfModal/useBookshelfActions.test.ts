import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useBookshelfActions} from '@pages/Book/components/AddToBookshelfModal/useBookshelfActions';
import {
    ADD_TO_BOOKSHELF_TEXTS,
    ALREADY_ON_SHELF_ERROR,
} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.constants';
import * as bookshelfApi from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api';
import {
    read,
    reading,
} from '@pages/Book/components/AddToBookshelfModal/bookshelfSelection.fixtures';

vi.mock('@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api');

const onRefresh = vi.fn().mockResolvedValue(undefined);

const renderActions = () =>
    renderHook(() => useBookshelfActions({token: 'tok', bookId: 'dune-1965', onRefresh}));

describe('useBookshelfActions', () => {
    beforeEach(() => {
        onRefresh.mockClear();
        vi.mocked(bookshelfApi.addBookToBookshelf).mockReset();
        vi.mocked(bookshelfApi.updateBookshelf).mockReset();
        vi.mocked(bookshelfApi.removeBookFromBookshelf).mockReset();
    });

    it('adds with only bookshelfId and apiBookId, refreshes, then shows a success alert', async () => {
        vi.mocked(bookshelfApi.addBookToBookshelf).mockResolvedValue(undefined);
        const {result} = renderActions();

        await act(async () => {
            await result.current.add(reading);
        });

        expect(bookshelfApi.addBookToBookshelf).toHaveBeenCalledWith({
            token: 'tok',
            bookshelfId: 2,
            apiBookId: 'dune-1965',
        });
        expect(onRefresh).toHaveBeenCalledTimes(1);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.alert).toEqual({
            message: ADD_TO_BOOKSHELF_TEXTS.ADDED_TO('Currently Reading'),
            variant: 'success',
            visible: true,
        });
    });

    it('shows the regular success alert when adding to Read', async () => {
        vi.mocked(bookshelfApi.addBookToBookshelf).mockResolvedValue(undefined);
        const {result} = renderActions();

        await act(async () => {
            await result.current.add(read);
        });

        expect(result.current.alert).toEqual({
            message: ADD_TO_BOOKSHELF_TEXTS.ADDED_TO('Read'),
            variant: 'success',
            visible: true,
        });
    });

    it('is loading while the add request is in flight', async () => {
        let resolveAdd: () => void = () => {};
        vi.mocked(bookshelfApi.addBookToBookshelf).mockReturnValue(
            new Promise((resolve) => {
                resolveAdd = () => resolve(undefined);
            })
        );
        const {result} = renderActions();

        let addPromise: Promise<boolean> = Promise.resolve(false);
        act(() => {
            addPromise = result.current.add(reading);
        });

        expect(result.current.isLoading).toBe(true);

        await act(async () => {
            resolveAdd();
            await addPromise;
        });

        expect(result.current.isLoading).toBe(false);
    });

    it('shows a danger alert when adding fails', async () => {
        vi.mocked(bookshelfApi.addBookToBookshelf).mockRejectedValue(new Error('Network error'));
        const {result} = renderActions();

        await act(async () => {
            await result.current.add(reading);
        });

        expect(result.current.alert).toEqual({
            message: 'Network error',
            variant: 'danger',
            visible: true,
        });
    });

    it('silently reloads the book status when the book is already shelved', async () => {
        vi.mocked(bookshelfApi.addBookToBookshelf).mockRejectedValue(
            new Error(ALREADY_ON_SHELF_ERROR)
        );
        const {result} = renderActions();

        let added = true;
        await act(async () => {
            added = await result.current.add(reading);
        });

        expect(added).toBe(false);
        expect(onRefresh).toHaveBeenCalled();
        expect(result.current.alert.visible).toBe(false);
    });

    it('moves with only bookshelfBookId and bookshelfId', async () => {
        vi.mocked(bookshelfApi.updateBookshelf).mockResolvedValue(undefined);
        const {result} = renderActions();

        await act(async () => {
            await result.current.update(10, read);
        });

        expect(bookshelfApi.updateBookshelf).toHaveBeenCalledWith({
            token: 'tok',
            bookshelfBookId: 10,
            bookshelfId: 3,
        });
        expect(onRefresh).toHaveBeenCalledTimes(1);
        expect(result.current.alert.message).toBe(ADD_TO_BOOKSHELF_TEXTS.MOVED_TO('Read'));
    });

    it('removes, refreshes, then shows a success alert', async () => {
        vi.mocked(bookshelfApi.removeBookFromBookshelf).mockResolvedValue(undefined);
        const {result} = renderActions();

        await act(async () => {
            await result.current.remove(10, 'Currently Reading');
        });

        expect(bookshelfApi.removeBookFromBookshelf).toHaveBeenCalledWith({
            token: 'tok',
            bookshelfBookId: 10,
        });
        expect(onRefresh).toHaveBeenCalledTimes(1);
        expect(result.current.alert.message).toBe(
            ADD_TO_BOOKSHELF_TEXTS.REMOVED_FROM('Currently Reading')
        );
    });

    it('does nothing when there is no token or bookId', async () => {
        const {result} = renderHook(() => useBookshelfActions({onRefresh}));

        await act(async () => {
            await result.current.add(reading);
        });

        expect(bookshelfApi.addBookToBookshelf).not.toHaveBeenCalled();
        expect(result.current.isLoading).toBe(false);
    });
});
