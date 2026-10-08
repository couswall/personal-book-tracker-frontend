import {BookshelfType} from '@pages/Book/book.interfaces';

export const SHELF_ICONS: Record<BookshelfType, string> = {
    TO_BE_READ: 'fa-solid fa-hourglass-half',
    CURRENTLY_READING: 'fa-solid fa-book-open',
    READ: 'fa-solid fa-check-double',
};

/** Backend 400 when adding a book that is already on a shelf (the UI was out of date). */
export const ALREADY_ON_SHELF_ERROR = 'This book has already been added to a bookshelf.';

export const ADD_TO_BOOKSHELF_TEXTS = {
    MODAL_TITLE: 'Add to bookshelf',
    MOVE_MODAL_TITLE: 'Move to bookshelf',
    CURRENT_BADGE: 'Current',
    REMOVE_FROM_BOOKSHELF: 'Remove from Bookshelf',
    BOOK_SINGULAR: 'BOOK',
    BOOK_PLURAL: 'BOOKS',
    ADDED_TO: (bookshelfName: string) => `Added to '${bookshelfName}'`,
    MOVED_TO: (bookshelfName: string) => `Moved to '${bookshelfName}'`,
    REMOVED_FROM: (bookshelfName: string) => `Removed from '${bookshelfName}'`,
};

export const REMOVAL_WARNING_TEXTS = {
    DELETES_READS: (years: number[]) =>
        `This also deletes your reads of this book (${years.join(', ')}).`,
    REMOVED_FROM_CHALLENGE: (years: number[]) =>
        `It will be removed from your ${years.join(', ')} reading challenge.`,
};

export const REMOVE_CONFIRMATION_TEXTS = {
    TITLE: 'Remove from Bookshelf',
    SHELF_LABEL: 'Shelf:',
    CLOSE: 'Close',
    COMPLETED_BADGE: 'Completed',
    CANCEL: 'Cancel',
    CONFIRM: 'Remove Book',
};
