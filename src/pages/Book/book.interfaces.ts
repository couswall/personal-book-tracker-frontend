import {ProgressInputMethod} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';

export interface IGetBookshelvesWithStatusParams {
    token: string;
    apiBookId: string;
    setBookshelves: React.Dispatch<React.SetStateAction<IBookshelfWithStatus[]>>;
    setReads: React.Dispatch<React.SetStateAction<IRead[]>>;
}

export type BookshelfType = 'READ' | 'CURRENTLY_READING' | 'TO_BE_READ';

export interface IBookshelfWithStatus {
    id: number;
    name: string;
    type: BookshelfType;
    /** The book is currently on this shelf. A book is on at most one shelf. */
    isSelected: boolean;
    bookshelfBookId: number | null;
    bookCount: number;
    readingProgress: number | null;
    currentPage: number | null;
    progressType: ProgressInputMethod | null;
}

/** One finish of this book, whatever shelf it is on now. */
export interface IRead {
    /** Stored at UTC midnight, e.g. "2026-03-15T00:00:00.000Z". */
    finishedAt: string;
    /** The user has a reading challenge for this finish's year. */
    hasChallenge: boolean;
}

export interface IGetBookshelvesWithStatusResponse {
    bookshelves: IBookshelfWithStatus[];
    /** Every finish of this book, newest first. Empty if never finished. */
    reads: IRead[];
}
