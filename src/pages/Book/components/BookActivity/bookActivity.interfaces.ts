import {BookshelfType} from '@pages/Book/book.interfaces';

export interface IBookActivityProps {
    onOpenAddToBookshelfModal: () => void;
    onUpdateProgress?: () => void;
    bookshelfLabel?: string;
    bookshelfType?: BookshelfType;
    progressPercentage?: number;
}
