import {IBook} from '@store/books/getBookById/interfaces';
import {BookshelfType} from '@pages/Book/book.interfaces';

export interface IBookTopSectionProps {
    book: IBook;
    isOwned: boolean;
    onOpenAddToBookshelfModal: () => void;
    onUpdateProgress?: () => void;
    bookshelfLabel?: string;
    bookshelfType?: BookshelfType;
    progressPercentage?: number;
}
