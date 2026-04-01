import {useEffect, useRef, useState} from 'react';
import {
    addBookToBookshelf,
    removeBookFromBookshelf,
    updateBookshelf,
    IAlertState,
    IUseBookshelfActionsParams,
} from '@pages/Book/components/AddToBookshelfModal/index';
import {GENERAL_ERROR_MSGS} from '@constants/errorMessages';

export const useBookshelfActions = ({token, bookId, onRefresh}: IUseBookshelfActionsParams) => {
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState<IAlertState>({
        message: '',
        variant: 'success',
        visible: false,
    });
    const alertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        };
    }, []);

    const showAlert = (message: string, variant: 'success' | 'danger') => {
        if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
        setAlert({message, variant, visible: true});
        alertTimeoutRef.current = setTimeout(
            () => setAlert((prev) => ({...prev, visible: false})),
            3000
        );
    };

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
