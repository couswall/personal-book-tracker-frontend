import {IBook} from '@store/books/getBookById/interfaces';

export interface IBookTopSectionProps {
    book: IBook;
    isOwned: boolean;
    onOpenAddToBookshelfModal: () => void;
    onUpdateProgress?: () => void;
    bookshelfLabel?: string;
    progressPercentage?: number;
}
