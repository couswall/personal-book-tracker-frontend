import {useState} from 'react';
import {
    addBookToBookshelf,
    removeBookFromBookshelf,
    updateBookshelf,
    IUseBookshelfActionsParams,
    ADD_TO_BOOKSHELF_TEXTS,
    ALREADY_ON_SHELF_ERROR,
} from '@pages/Book/components/AddToBookshelfModal/index';
import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';
import {useModalAlert} from '@pages/Book/hooks/useModalAlert';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';

export const useBookshelfActions = ({token, bookId, onRefresh}: IUseBookshelfActionsParams) => {
    const [isLoading, setIsLoading] = useState(false);
    const {alert, showAlert} = useModalAlert();

    const showError = (error: unknown) => {
        const message =
            error instanceof Error ? error.message : GENERAL_ERROR_MSGS.SOMETHING_WENT_WRONG;
        showAlert(message, 'danger');
    };

    /** Reloads the book's status. Never throws: a failure is shown as an alert instead. */
    const refresh = async () => {
        try {
            await onRefresh();
        } catch (error) {
            showError(error);
        }
    };

    /** Resolves true when the book ended up on the shelf, false otherwise. */
    const add = async (shelf: IBookshelfWithStatus) => {
        if (!token || !bookId) return false;
        try {
            setIsLoading(true);
            await addBookToBookshelf({token, bookshelfId: shelf.id, apiBookId: bookId});
            showAlert(ADD_TO_BOOKSHELF_TEXTS.ADDED_TO(shelf.name), 'success');
            await refresh();
            return true;
        } catch (error) {
            // The UI was out of date (another tab/device or a double submit): silently reload
            // the book's status so the modal switches to "Move".
            if (error instanceof Error && error.message === ALREADY_ON_SHELF_ERROR) {
                await refresh();
            } else {
                showError(error);
            }
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const update = async (bookshelfBookId: number, shelf: IBookshelfWithStatus) => {
        if (!token || !bookId) return false;
        try {
            setIsLoading(true);
            await updateBookshelf({token, bookshelfBookId, bookshelfId: shelf.id});
            showAlert(ADD_TO_BOOKSHELF_TEXTS.MOVED_TO(shelf.name), 'success');
            await refresh();
            return true;
        } catch (error) {
            showError(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const remove = async (bookshelfBookId: number, bookshelfName: string) => {
        if (!token) return false;
        try {
            setIsLoading(true);
            await removeBookFromBookshelf({token, bookshelfBookId});
            showAlert(ADD_TO_BOOKSHELF_TEXTS.REMOVED_FROM(bookshelfName), 'success');
            await refresh();
            return true;
        } catch (error) {
            showError(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {isLoading, alert, add, update, remove};
};
