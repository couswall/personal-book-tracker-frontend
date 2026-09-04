import {useState} from 'react';
import {
    addBookToBookshelf,
    removeBookFromBookshelf,
    updateBookshelf,
    IUseBookshelfActionsParams,
} from '@pages/Book/components/AddToBookshelfModal/index';
import {useModalAlert} from '@pages/Book/hooks/useModalAlert';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';

export const useBookshelfActions = ({token, bookId, onRefresh}: IUseBookshelfActionsParams) => {
    const [isLoading, setIsLoading] = useState(false);
    const {alert, showAlert} = useModalAlert();

    const add = async (bookshelfId: number, bookshelfName: string) => {
        if (!token || !bookId) return;
        try {
            setIsLoading(true);
            await addBookToBookshelf({token, bookshelfId, apiBookId: bookId, onSuccess: onRefresh});
            showAlert(`Added to '${bookshelfName}'`, 'success');
        } catch (error) {
            const message =
                error instanceof Error ? error.message : GENERAL_ERROR_MSGS.SOMETHING_WENT_WRONG;
            showAlert(message, 'danger');
        } finally {
            setIsLoading(false);
        }
    };

    const update = async (bookshelfBookId: number, bookshelfId: number, bookshelfName: string) => {
        if (!token || !bookId) return;
        try {
            setIsLoading(true);
            await updateBookshelf({token, bookshelfBookId, bookshelfId, onSuccess: onRefresh});
            showAlert(`Added to '${bookshelfName}'`, 'success');
        } catch (error) {
            const message =
                error instanceof Error ? error.message : GENERAL_ERROR_MSGS.SOMETHING_WENT_WRONG;
            showAlert(message, 'danger');
        } finally {
            setIsLoading(false);
        }
    };

    const remove = async (bookshelfBookId: number, bookshelfName: string) => {
        if (!token) return;
        try {
            setIsLoading(true);
            await removeBookFromBookshelf({token, bookshelfBookId, onSuccess: onRefresh});
            showAlert(`Removed from '${bookshelfName}'`, 'success');
        } catch (error) {
            const message =
                error instanceof Error ? error.message : GENERAL_ERROR_MSGS.SOMETHING_WENT_WRONG;
            showAlert(message, 'danger');
        } finally {
            setIsLoading(false);
        }
    };

    return {isLoading, alert, add, update, remove};
};
