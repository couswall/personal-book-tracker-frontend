import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';
import {AlertVariant} from '@pages/Book/hooks/hooks.interfaces';

export interface IBaseBookshelfParams {
    token: string;
    onSuccess: () => Promise<void>;
}

export interface IAddToBookshelfParams extends IBaseBookshelfParams {
    bookshelfId: number;
    apiBookId: string;
}

export interface IUpdateBookshelfParams extends IBaseBookshelfParams {
    bookshelfBookId: number;
    bookshelfId: number;
}

export interface IRemoveBookFromBookshelfParams extends IBaseBookshelfParams {
    bookshelfBookId: number;
}

export interface IUseBookshelfActionsParams {
    token?: string;
    bookId?: string;
    onRefresh: () => Promise<void>;
}

export interface IModalAlertProps {
    message: string;
    variant: AlertVariant;
}
export interface IAddToBookshelfModalProps {
    isOpen: boolean;
    onCloseModal: () => void;
    bookshelves: IBookshelfWithStatus[];
    bookId?: string;
    token?: string;
    onRefresh: () => Promise<void>;
}
