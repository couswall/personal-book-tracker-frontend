import {IBookshelfWithStatus} from '@pages/Book/book.interfaces';

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

export interface IAlertState {
    message: string;
    variant: 'success' | 'danger';
    visible: boolean;
}

export interface IUseBookshelfActionsParams {
    token?: string;
    bookId?: string;
    onRefresh: () => Promise<void>;
}

export interface IModalAlertProps {
    message: string;
    variant: 'success' | 'danger';
}
export interface IAddToBookshelfModalProps {
    isOpen: boolean;
    onCloseModal: () => void;
    bookshelves: IBookshelfWithStatus[];
    bookId?: string;
    token?: string;
    onRefresh: () => Promise<void>;
}
