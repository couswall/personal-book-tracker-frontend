import {useState} from 'react';
import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';
import {useBookshelfActions} from '@pages/Book/components/AddToBookshelfModal/useBookshelfActions';
import {IUseBookshelfSelectionParams} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.interfaces';
import {getRemovalWarning} from '@pages/Book/components/AddToBookshelfModal/addToBookshelfModal.utils';

export const useBookshelfSelection = ({
    bookshelves,
    reads,
    token,
    bookId,
    onRefresh,
    onCloseModal,
}: IUseBookshelfSelectionParams) => {
    const {isLoading, alert, add, update, remove} = useBookshelfActions({token, bookId, onRefresh});
    const [targetShelfId, setTargetShelfId] = useState<number | null>(null);
    /**
     * The bookshelfBookId the Remove dialog was opened for. Tying it to that id (instead of a
     * boolean) closes the dialog on its own if the book leaves the shelf some other way, and
     * keeps it from reappearing if the book is added again later (which creates a new id).
     */
    const [removeTargetId, setRemoveTargetId] = useState<number | null>(null);

    /** undefined → the book is not in the library: "Add" mode. Otherwise "Move" mode. */
    const currentShelf = bookshelves.find((shelf) => shelf.isSelected);
    const isConfirmingRemove =
        removeTargetId !== null && currentShelf?.bookshelfBookId === removeTargetId;
    const isMoveMode = Boolean(currentShelf);
    const removalWarning = getRemovalWarning(reads);

    const handleSelectBookshelf = async (shelf: IBookshelfWithStatus) => {
        if (isLoading || shelf.isSelected) return;
        setTargetShelfId(shelf.id);
        if (currentShelf?.bookshelfBookId) {
            await update(currentShelf.bookshelfBookId, shelf);
        } else {
            await add(shelf);
        }
        setTargetShelfId(null);
    };

    const handleDeleteFromBookshelf = async () => {
        if (isLoading || !currentShelf?.bookshelfBookId) return;
        const removed = await remove(currentShelf.bookshelfBookId, currentShelf.name);
        if (removed) setRemoveTargetId(null);
    };

    const handleRequestRemove = () => setRemoveTargetId(currentShelf?.bookshelfBookId ?? null);

    const cancelRemove = () => setRemoveTargetId(null);

    const handleCloseModal = () => {
        setRemoveTargetId(null);
        onCloseModal();
    };

    const isTarget = (shelf: IBookshelfWithStatus) => shelf.id === targetShelfId;

    return {
        isLoading,
        alert,
        currentShelf,
        isMoveMode,
        removalWarning,
        isConfirmingRemove,
        handleSelectBookshelf,
        handleDeleteFromBookshelf,
        handleRequestRemove,
        cancelRemove,
        handleCloseModal,
        isTarget,
    };
};
