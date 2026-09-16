import {beforeEach, describe, expect, it, vi} from 'vitest';
import {act, renderHook} from '@testing-library/react';
import {useBookshelfActions} from '@pages/Book/components/AddToBookshelfModal/useBookshelfActions';
import {ADD_TO_BOOKSHELF_TEXTS} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.constants';
import * as bookshelfApi from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api';

vi.mock('@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.api');

const onRefresh = vi.fn().mockResolvedValue(undefined);

describe('useBookshelfActions', () => {
    beforeEach(() => {
        vi.mocked(bookshelfApi.addBookToBookshelf).mockReset();
        vi.mocked(bookshelfApi.updateBookshelf).mockReset();
        vi.mocked(bookshelfApi.removeBookFromBookshelf).mockReset();
    });

    it('shows a success alert and clears loading after adding a book', async () => {
        vi.mocked(bookshelfApi.addBookToBookshelf).mockResolvedValue(undefined);
        const {result} = renderHook(() =>
            useBookshelfActions({token: 'tok', bookId: 'dune-1965', onRefresh})
        );

        await act(async () => {
            await result.current.add(1, 'Currently Reading');
        });

        expect(bookshelfApi.addBookToBookshelf).toHaveBeenCalledWith({
            token: 'tok',
            bookshelfId: 1,
            apiBookId: 'dune-1965',
            onSuccess: onRefresh,
        });
        expect(result.current.isLoading).toBe(false);
        expect(result.current.alert).toEqual({
            message: ADD_TO_BOOKSHELF_TEXTS.ADDED_TO('Currently Reading'),
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
        const {result} = renderHook(() =>
            useBookshelfActions({token: 'tok', bookId: 'dune-1965', onRefresh})
        );

        let addPromise: Promise<void> = Promise.resolve();
        act(() => {
            addPromise = result.current.add(1, 'Currently Reading');
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
        const {result} = renderHook(() =>
            useBookshelfActions({token: 'tok', bookId: 'dune-1965', onRefresh})
        );

        await act(async () => {
            await result.current.add(1, 'Currently Reading');
        });

        expect(result.current.alert).toEqual({
            message: 'Network error',
            variant: 'danger',
            visible: true,
        });
    });

    it('shows a success alert after moving to a different bookshelf', async () => {
        vi.mocked(bookshelfApi.updateBookshelf).mockResolvedValue(undefined);
        const {result} = renderHook(() =>
            useBookshelfActions({token: 'tok', bookId: 'dune-1965', onRefresh})
        );

        await act(async () => {
            await result.current.update(10, 2, 'Read');
        });

        expect(bookshelfApi.updateBookshelf).toHaveBeenCalledWith({
            token: 'tok',
            bookshelfBookId: 10,
            bookshelfId: 2,
            onSuccess: onRefresh,
        });
        expect(result.current.alert.message).toBe(ADD_TO_BOOKSHELF_TEXTS.ADDED_TO('Read'));
    });

    it('shows a success alert after removing from a bookshelf', async () => {
        vi.mocked(bookshelfApi.removeBookFromBookshelf).mockResolvedValue(undefined);
        const {result} = renderHook(() =>
            useBookshelfActions({token: 'tok', bookId: 'dune-1965', onRefresh})
        );

        await act(async () => {
            await result.current.remove(10, 'Currently Reading');
        });

        expect(bookshelfApi.removeBookFromBookshelf).toHaveBeenCalledWith({
            token: 'tok',
            bookshelfBookId: 10,
            onSuccess: onRefresh,
        });
        expect(result.current.alert.message).toBe(
            ADD_TO_BOOKSHELF_TEXTS.REMOVED_FROM('Currently Reading')
        );
    });

    it('does nothing when there is no token or bookId', async () => {
        const {result} = renderHook(() => useBookshelfActions({onRefresh}));

        await act(async () => {
            await result.current.add(1, 'Currently Reading');
        });

        expect(bookshelfApi.addBookToBookshelf).not.toHaveBeenCalled();
        expect(result.current.isLoading).toBe(false);
    });
});
