export const DEFAULT_SHELF_ICONS: Record<string, string> = {
    'to be read': 'fa-solid fa-hourglass-half',
    'currently reading': 'fa-solid fa-book-open',
    read: 'fa-solid fa-check-double',
};

export const ADD_TO_BOOKSHELF_TEXTS = {
    MODAL_TITLE: 'Add to bookshelf',
    REMOVE_FROM_BOOKSHELF: 'Remove from Bookshelf',
    BOOK_SINGULAR: 'BOOK',
    BOOK_PLURAL: 'BOOKS',
    ADDED_TO: (bookshelfName: string) => `Added to '${bookshelfName}'`,
    REMOVED_FROM: (bookshelfName: string) => `Removed from '${bookshelfName}'`,
};
