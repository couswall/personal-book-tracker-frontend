import {IBookshelfWithStatus, IRead} from '@pages/Book/book.interfaces';
import {AlertVariant} from '@pages/Book/hooks/hooks.interfaces';

/**
 * The request helpers only send the request. The caller reloads the book's status afterwards,
 * so a failed reload isn't reported as a failed add/move/remove.
 */
export interface IBaseBookshelfParams {
    token: string;
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

export interface IUseBookshelfSelectionParams extends IUseBookshelfActionsParams {
    bookshelves: IBookshelfWithStatus[];
    reads: IRead[];
    onCloseModal: () => void;
}

export interface IBookshelfOptionItemProps {
    option: IBookshelfWithStatus;
    /** The shelf the user just picked; styled differently from the current shelf. */
    isTarget: boolean;
    isLoading: boolean;
    onSelect: (option: IBookshelfWithStatus) => void;
}

export interface IModalAlertProps {
    message: string;
    variant: AlertVariant;
}

export interface IAddToBookshelfModalProps {
    isOpen: boolean;
    onCloseModal: () => void;
    bookshelves: IBookshelfWithStatus[];
    reads: IRead[];
    bookTitle: string;
    bookAuthors: string[];
    coverImageUrl: string | null;
    bookId?: string;
    token?: string;
    onRefresh: () => Promise<void>;
}

export interface IWarningCalloutProps {
    /** First line is the headline; any following lines are shown as details. */
    lines: string[];
}

export interface IBookContextCardProps {
    title: string;
    authors: string[];
    coverImageUrl: string | null;
    badgeLabel?: string;
}

export interface IRemoveConfirmationViewProps {
    shelfName: string;
    bookTitle: string;
    bookAuthors: string[];
    coverImageUrl: string | null;
    isCompleted: boolean;
    /** null = nothing to warn about, so no warning block is rendered. */
    warningLines: string[] | null;
    isLoading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    onClose: () => void;
}
