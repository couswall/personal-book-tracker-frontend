import {ProgressInputMethod} from '@pages/Book/components/UpdateProgressModal/updateProgressModal.interfaces';

export interface IGetBookshelvesWithStatusParams {
    token: string;
    userId: number;
    apiBookId: string;
    setBookshelves: React.Dispatch<React.SetStateAction<IBookshelfWithStatus[]>>;
}

export interface IBookshelfWithStatus {
    id: number;
    name: string;
    isSelected: boolean;
    bookshelfBookId: number | null;
    bookCount: number;
    readingProgress: number | null;
    currentPage: number | null;
    progressType: ProgressInputMethod | null;
}

export interface IGetBookshelvesWithStatusResponse {
    bookshelves: IBookshelfWithStatus[];
}
